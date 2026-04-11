# MasterSheetv2 Code Review Report

**Date:** 2026-04-07  
**Scope:** Backend sync/data layer, frontend transaction flows, analytics/view layer, DB schema fit for accounting and analysis.

## Executive summary

The codebase has a solid base for an accounting-first transactional system:
- useful audit-log sync architecture,
- clear transactional/soft-delete model,
- practical currency-safe arithmetic in key places,
- and a schema that already supports categorization, assets, employees, and corp-level grouping.

However, there are a few **high-severity logic and maintainability issues** to resolve before relying on it for robust accounting analytics:

1. **Frontend contains lint-detected correctness issues** (undefined function use, hook-order/closure risk) that can cause runtime bugs and unpredictable behavior.
2. **Schema/action mismatch for deletes**: backend writes `DELETE` actions to audit log, while DB schema only allows `INSERT`, `UPDATE`, `PUBLISH` in `audit_log.action_type`.
3. **View analytics logic is currently using non-existent fields (`in_amount` / `out_amount`)**, so the “realized profit” cards/tables are not accounting-correct yet.
4. **`burmese_name` is sent from UI for `local_tree`, but backend whitelist strips it**, causing silent data loss.
5. **Credentials are hardcoded in backend DB config**, which is a production/security blocker.

Overall health right now: **“Good prototype, not yet production-safe accounting platform.”**

---

## Strengths

- **Sync model is conceptually strong:** server-side audit checkpointing and client catch-up by `after_id` are in place, enabling incremental sync and eventual consistency.
- **Soft-delete strategy is consistently used** across domain tables and transaction math avoids counting soft-deleted rows in running balances.
- **Money math uses `currency.js`** in many critical paths, reducing floating-point drift risk.
- **Relational schema includes meaningful foreign keys + indexes** for core accounting entities (corp, tree taxonomy, transactions, assets, employees).

---

## Findings by severity

## 🔴 High severity

### 1) Lint/runtime correctness issues in frontend (real bug risk)

`npm run lint` reports multiple errors that indicate probable runtime or stale-closure bugs:
- `CorpDropdown.jsx`: callback references `handleCloseDropdown` before declaration.
- `treeViewHelpers.js`: `buildRowMap` used but not imported/defined.
- several `setState in effect` violations that are likely to cause render churn and fragile behavior.

**Impact:** UI interaction bugs, unstable editing flows, difficult-to-debug state behavior.

**Recommendation:** fix all lint errors before feature expansion; treat lint errors as merge blockers.

---

### 2) `audit_log.action_type` enum mismatch with backend behavior

DB schema defines:
- `audit_log.action_type ENUM('INSERT', 'UPDATE', 'PUBLISH')`

Backend push flow logs action type using uppercased incoming action (including delete semantics) and supports delete operations by soft-delete update path.

**Impact:** Any action logged as `DELETE` can fail at DB level (or force inconsistent conventions), breaking sync reliability.

**Recommendation:** choose one canonical model and enforce it end-to-end:
- Option A: keep soft-delete as `UPDATE` only (no DELETE audit action), or
- Option B: extend enum to include `DELETE` and adapt replay logic explicitly.

---

### 3) View analytics uses non-existent transaction fields

`viewHelpers.summarizeCorps` calculates totals using `tx.in_amount` and `tx.out_amount`, but transaction objects are built around `amount`, `rate`, `adjustment`, `total_mmk`.

**Impact:** “Realized Profit” and related analytics are currently not trustworthy for accounting decisions.

**Recommendation:** define formal accounting metrics (e.g., inflow/outflow by sign and category, gross margin rules) using actual transaction schema.

---

### 4) Silent data loss for `burmese_name` on local tree inserts/updates

Frontend queues `burmese_name` for local tree node create/rename, but backend allowed column whitelist for `local_tree` does not include `burmese_name`.

**Impact:** localized naming appears to “save” in UI state but may never persist to DB; causes data integrity confusion.

**Recommendation:** either add `burmese_name` to schema + whitelist, or stop collecting/sending it until supported.

---

### 5) Hardcoded DB credentials in source

DB pool is initialized with literal host/user/password.

**Impact:** serious security and deployment risk; blocks multi-env setup and secrets hygiene.

**Recommendation:** move credentials to environment variables and fail fast if missing.

---

## 🟠 Medium severity

### 6) Duplicate/bundled source trees increase overlap and drift risk

Repo includes active `frontend/` and `backend/` plus bundled mirrors (`bundled_f2`, `bundled_b2`, etc.).

**Impact:** high chance of overlapping/duplicate logic, confusion about source of truth, inconsistent fixes.

**Recommendation:** document canonical source directories and archive/remove generated mirrors from main dev path.

---

### 7) Business-rule correctness around date checkpointing needs explicit tests

Initialization fetch strategy uses `last_verified_date` and queries `tx_date > minVerifiedDate` depending on corp states.

**Impact:** edge cases around date boundaries and mixed corp checkpoints can cause over/under-inclusion and balance drift.

**Recommendation:** add integration tests for:
- corp with null/nonnull `last_verified_date`,
- day-boundary inclusions,
- soft-deleted historical entries.

---

## 🟢 Low severity / quality opportunities

- Standardize naming: `employee` table max id is returned as `employees` in backend max-id payload; frontend uses mixed singular/plural keys in different places.
- Add lightweight API validation for request payloads (`actions`, table names, row ids, changed_data shape).
- Add unit tests around transaction math helpers (especially inverse + foreign + manual total combinations).

---

## Accounting readiness assessment

## What is already good for accounting

- **Core transaction model supports double-direction amounts** (positive/negative), foreign-rate handling, and adjustments.
- **Audit replay architecture** provides a change ledger primitive useful for traceability and synchronization.
- **Category trees** (global/local) support dimensional tagging needed for reporting.

## What must be fixed before “accounting-grade” confidence

1. **Analytics definitions and implementation alignment** (profit/inflow/outflow based on real columns).  
2. **Audit action consistency** between API behavior and schema enum.  
3. **Data-field contract alignment** (`burmese_name`, max-id key naming, strict payload schema).  
4. **Automated correctness tests** for balance rollups, checkpoint logic, and sync conflict handling.

## Current accounting readiness verdict

- **Operational bookkeeping UI:** usable prototype.
- **Reliable financial reporting/analysis:** not ready yet without the high-severity fixes.

---

## Overlap / function duplication observations

- Transaction math is centralized well in `transactionTableHelpers`, which is good.
- But logic exists in multiple “entry points” (init hydration, sync refresh merge, form submit, edit save), increasing risk of partial duplication and drift.
- Presence of bundled duplicate trees in repo materially increases overlap risk.

**Recommendation:** after bug-fix pass, plan a small architecture pass to define single “source-of-truth” modules for:
- transaction normalization,
- balance recomputation,
- analytics metric computation.

---

## Suggested next step plan (no refactor yet)

1. Fix lint errors and schema mismatches (safety pass).
2. Write 6–10 targeted tests for accounting math + audit replay edge cases.
3. Define metric specs for View page (what exactly counts as profit/inflow/outflow).
4. Then do a focused refactor only where duplication causes measurable inconsistency.

