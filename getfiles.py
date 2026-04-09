import os
import sys
import shutil

IGNORE_DIRS = {
    "node_modules",
    ".git",
    "dist",
    "build",
    "__pycache__",
    ".vite",
    ".next",
    "coverage",
}

MODE_CONFIG = {
    "f":  ("frontend", {".js", ".jsx"}),
    "b":  ("backend", {".js", ".jsx", ".css"}),

    "f2": ("frontend",   {".js", ".jsx"}),
    "b2": ("backend", {".js", ".jsx"}),

    "f3": ("frontend",   {".js", ".jsx", ".css"}),
    "b3": ("backend", {".js", ".jsx", ".css"}),
}


def collect_files(base_folder, extensions):
    matched_files = []

    for root, dirs, files in os.walk(base_folder):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]

        for file_name in files:
            _, ext = os.path.splitext(file_name)
            if ext.lower() in extensions:
                full_path = os.path.join(root, file_name)
                matched_files.append(full_path)

    matched_files.sort()
    return matched_files


def safe_flat_name(base_folder, file_path):
    rel_path = os.path.relpath(file_path, base_folder)
    rel_no_ext, ext = os.path.splitext(rel_path)

    flat_name = rel_no_ext.replace("\\", "__").replace("/", "__")
    return flat_name + ext


def copy_files_flat(base_folder, files, output_folder):
    if os.path.exists(output_folder):
        shutil.rmtree(output_folder)

    os.makedirs(output_folder, exist_ok=True)

    for file_path in files:
        new_name = safe_flat_name(base_folder, file_path)
        dest_path = os.path.join(output_folder, new_name)
        shutil.copy2(file_path, dest_path)


def main():
    if len(sys.argv) != 2:
        print("Usage:")
        print("  python getfiles.py f")
        print("  python getfiles.py b")
        print("  python getfiles.py f2")
        print("  python getfiles.py b2")
        print("  python getfiles.py f3")
        print("  python getfiles.py b3")
        sys.exit(1)

    mode = sys.argv[1].lower()

    if mode not in MODE_CONFIG:
        print(f"Invalid mode: {mode}")
        print("Valid modes: f, b, f2, b2, f3, b3")
        sys.exit(1)

    folder_name, extensions = MODE_CONFIG[mode]
    cwd = os.getcwd()
    target_folder = os.path.join(cwd, folder_name)

    if not os.path.isdir(target_folder):
        print(f"Folder not found: {target_folder}")
        sys.exit(1)

    files = collect_files(target_folder, extensions)

    if not files:
        print(f"No matching files found in: {target_folder}")
        sys.exit(0)

    output_folder = os.path.join(cwd, f"bundled_{mode}")

    copy_files_flat(target_folder, files, output_folder)

    print(f"Copied {len(files)} files into:")
    print(output_folder)


if __name__ == "__main__":
    main()