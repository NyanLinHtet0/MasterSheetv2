import os

# Configuration
OUTPUT_FILE = "important_project_files.txt"
# Folders to completely ignore
IGNORE_DIRS = {'node_modules', '.git', 'dist', 'assets', 'public'}
# Extensions you want to capture
INCLUDE_EXTENSIONS = {'.js', '.jsx'}
# {'.js', '.jsx', '.css'}

def bundle_files():
    # Get the directory where the script is running
    root_dir = os.getcwd()
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as outfile:
        for root, dirs, files in os.walk(root_dir):
            # Modify dirs in-place to skip ignored directories
            dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
            
            for file in files:
                if any(file.endswith(ext) for ext in INCLUDE_EXTENSIONS):
                    # Skip lock files as they are huge and rarely "important"
                    if 'lock' in file:
                        continue
                        
                    file_path = os.path.join(root, file)
                    relative_path = os.path.relpath(file_path, root_dir)
                    
                    outfile.write(f"\n{'='*50}\n")
                    outfile.write(f"FILE: {relative_path}\n")
                    outfile.write(f"{'='*50}\n\n")
                    
                    try:
                        with open(file_path, 'r', encoding='utf-8') as infile:
                            outfile.write(infile.read())
                    except Exception as e:
                        outfile.write(f"[Error reading file: {e}]")
                    
                    outfile.write("\n\n")

    print(f"Successfully bundled important files into: {OUTPUT_FILE}")

if __name__ == "__main__":
    bundle_files()