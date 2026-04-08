import json
import os
import argparse
from decimal import Decimal, InvalidOperation


def sql_quote(value):
    if value is None:
        return "NULL"
    return "'" + str(value).replace("\\", "\\\\").replace("'", "''") + "'"


def parse_decimal(value, default="0"):
    if value is None or value == "":
        return Decimal(default)

    if isinstance(value, Decimal):
        return value

    if isinstance(value, (int, float)):
        return Decimal(str(value))

    if isinstance(value, str):
        cleaned = value.replace(",", "").replace('"', "").strip()
        if cleaned == "":
            return Decimal(default)
        try:
            return Decimal(cleaned)
        except InvalidOperation:
            return Decimal(default)

    return Decimal(default)


def parse_int(value, default=None):
    if value is None or value == "":
        return default
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def normalize_date(date_str):
    if not date_str:
        return "1970-01-01"

    parts = str(date_str).strip().split("-")
    if len(parts) == 3:
        try:
            y = int(parts[0])
            m = int(parts[1])
            d = int(parts[2])
            return f"{y:04d}-{m:02d}-{d:02d}"
        except ValueError:
            pass

    return "1970-01-01"


def resolve_global_tree_id(tx, amount_val):
    """
    Priority:
    1. explicit global_tree_id
    2. explicit global tag field
    3. fallback sign rule
    """
    explicit_global = (
        tx.get("global_tree_id")
        or tx.get("globalTag")
        or tx.get("global_tag")
        or tx.get("trans_type_id")
        or tx.get("type_id")
    )
    explicit_global = parse_int(explicit_global, None)
    if explicit_global is not None:
        return explicit_global

    # last fallback only
    return 1 if amount_val >= 0 else 2


def resolve_local_tree_id(tx):
    """
    Accept a few possible field names from your JSON.
    """
    local_id = (
        tx.get("local_tree_id")
        or tx.get("localTag")
        or tx.get("local_tag")
        or tx.get("tag_id")
        or tx.get("category_id")
    )
    return parse_int(local_id, None)


def build_corp_sql(corp, idx):
    name = corp.get("name", f"Corp_{idx}")
    total_mmk = parse_decimal(0)
    total_foreign = parse_decimal(0)
    display_order = parse_int(corp.get("order", 0), 0)
    is_foreign = 1 if "total_foreign" in corp else 0
    inverse = 1 if corp.get("inverse") else 0
    start_day = parse_int(corp.get("start_day", 1), 1)
    soft_delete = parse_int(corp.get("soft_delete", 0), 0)

    safe_name = "".join(c if c.isalnum() or c in " _-" else "_" for c in name).strip()
    filename = f"{idx + 1:03d}_{safe_name}.sql"

    sql = []
    sql.append("-- =============================================")
    sql.append(f"-- Initialization Script for Corp: {name}")
    sql.append("-- =============================================")
    sql.append("START TRANSACTION;")
    sql.append("")

    # Insert corp_data
    sql.append(
        "INSERT INTO corp_data "
        "(name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)\n"
        "VALUES\n"
        f"({sql_quote(name)}, {is_foreign}, {total_mmk}, {total_foreign}, {start_day}, {inverse}, {display_order}, {soft_delete});"
    )
    sql.append("")
    sql.append("SET @current_corp_id = LAST_INSERT_ID();")
    sql.append("")

    transactions = corp.get("transactions", [])
    if transactions:
        for tx_idx, tx in enumerate(transactions, start=1):
            t_date = normalize_date(tx.get("date"))
            desc = tx.get("description", "")

            amount_val = parse_decimal(tx.get("amount", 0))
            rate_val = parse_decimal(tx.get("rate", 0))
            adjustment_val = parse_decimal(tx.get("adjustment", 0))

            local_tree_id = resolve_local_tree_id(tx)
            global_tree_id = resolve_global_tree_id(tx, amount_val)

            employee_id = parse_int(tx.get("employee_id"), None)
            asset_id = parse_int(tx.get("asset_id"), None)
            tx_status = parse_int(tx.get("tx_status", 1), 1)
            tx_soft_delete = parse_int(tx.get("soft_delete", 0), 0)

            # If local_tree_id exists, derive global_tree_id from local_tree.global_parent_id.
            # This is the important DB-correct behavior.
            if local_tree_id is not None:
                sql.append(
                    "-- ---------------------------------------------\n"
                    f"-- Transaction {tx_idx}\n"
                    "-- local_tree_id is authoritative when present\n"
                    "-- global_tree_id is taken from local_tree.global_parent_id\n"
                    "-- ---------------------------------------------"
                )
                sql.append(
                    "INSERT INTO transactions "
                    "(corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)\n"
                    "SELECT\n"
                    f"  @current_corp_id,\n"
                    f"  {sql_quote(t_date)},\n"
                    f"  {sql_quote(desc)},\n"
                    f"  {amount_val},\n"
                    f"  {rate_val},\n"
                    f"  {adjustment_val},\n"
                    "  lt.global_parent_id,\n"
                    "  lt.id,\n"
                    f"  {employee_id if employee_id is not None else 'NULL'},\n"
                    f"  {asset_id if asset_id is not None else 'NULL'},\n"
                    f"  {tx_soft_delete},\n"
                    f"  {tx_status}\n"
                    "FROM local_tree lt\n"
                    f"WHERE lt.id = {local_tree_id}\n"
                    "  AND lt.corp_id = @current_corp_id\n"
                    "LIMIT 1;"
                )
                sql.append("")
            else:
                sql.append(
                    "-- ---------------------------------------------\n"
                    f"-- Transaction {tx_idx}\n"
                    "-- no local_tree_id provided, using explicit/fallback global_tree_id\n"
                    "-- ---------------------------------------------"
                )
                sql.append(
                    "INSERT INTO transactions "
                    "(corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)\n"
                    "VALUES\n"
                    f"(@current_corp_id, {sql_quote(t_date)}, {sql_quote(desc)}, {amount_val}, {rate_val}, {adjustment_val}, {global_tree_id}, NULL, "
                    f"{employee_id if employee_id is not None else 'NULL'}, "
                    f"{asset_id if asset_id is not None else 'NULL'}, "
                    f"{tx_soft_delete}, {tx_status});"
                )
                sql.append("")

    sql.append("COMMIT;")
    return "\n".join(sql), filename


def main():
    parser = argparse.ArgumentParser(description="Generate SQL init scripts from JSON corps data.")
    parser.add_argument(
        "-f",
        action="store_true",
        help="Output to a folder with individual files instead of a single file."
    )
    parser.add_argument(
        "--input",
        type=str,
        default="corps_2.json",
        help="Input JSON file (default: corps_2.json)."
    )
    parser.add_argument(
        "--output",
        type=str,
        default="init_corps.sql",
        help="Output single file name (default: init_corps.sql)."
    )
    parser.add_argument(
        "--outdir",
        type=str,
        default="corps_init_scripts",
        help="Output folder name if -f is used (default: corps_init_scripts)."
    )

    args = parser.parse_args()

    try:
        with open(args.input, "r", encoding="utf-8") as f:
            corps_data = json.load(f)
    except FileNotFoundError:
        print(f"Error: Could not find '{args.input}'.")
        return
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in '{args.input}': {e}")
        return

    if not isinstance(corps_data, list):
        print("Error: Top-level JSON must be a list of corporations.")
        return

    if args.f:
        os.makedirs(args.outdir, exist_ok=True)
        for idx, corp in enumerate(corps_data):
            sql_content, filename = build_corp_sql(corp, idx)
            filepath = os.path.join(args.outdir, filename)
            with open(filepath, "w", encoding="utf-8") as out:
                out.write(sql_content)
        print(f"Success: Generated {len(corps_data)} SQL files in '{args.outdir}'.")
    else:
        with open(args.output, "w", encoding="utf-8") as out:
            out.write("-- =========================================================================\n")
            out.write("-- MASTER INITIALIZATION SCRIPT\n")
            out.write("-- Generated from JSON data\n")
            out.write("-- =========================================================================\n\n")

            for idx, corp in enumerate(corps_data):
                sql_content, _ = build_corp_sql(corp, idx)
                out.write(sql_content)
                out.write("\n\n")
        print(f"Success: Generated '{args.output}' with {len(corps_data)} corporations.")


if __name__ == "__main__":
    main()