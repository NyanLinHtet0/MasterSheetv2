import subprocess
import os
import time
import sys

def run_servers():
    # Get the directory where this script is located
    root_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(root_dir, 'backend')
    frontend_dir = os.path.join(root_dir, 'frontend')

    # Ensure the directories exist before trying to run commands
    if not os.path.exists(backend_dir) or not os.path.exists(frontend_dir):
        print("Error: Could not find 'backend' or 'frontend' folders.")
        print("Make sure this script is in the root directory alongside them.")
        sys.exit(1)

    print("🚀 Starting Backend Server...")
    # Based on your package.json, the backend starts with 'npm start' (node server.js)
    backend_process = subprocess.Popen(
        "npm start", 
        cwd=backend_dir, 
        shell=True
    )

    print("🚀 Starting Frontend Server...")
    # Vite projects usually start with 'npm run dev'
    frontend_process = subprocess.Popen(
        "npm run dev", 
        cwd=frontend_dir, 
        shell=True
    )

    print("\n==================================================")
    print("✅ Both servers are booting up!")
    print("🛑 Press Ctrl+C in this terminal to stop both servers.")
    print("==================================================\n")

    try:
        # Keep the main Python script running indefinitely
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        # When you press Ctrl+C, gracefully shut down both processes
        print("\n\nShutting down servers...")
        backend_process.terminate()
        frontend_process.terminate()
        print("Servers stopped successfully. Goodbye!")

if __name__ == "__main__":
    run_servers()