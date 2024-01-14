from flask import Flask,request, jsonify
app = Flask(__name__)

import subprocess
import os
import shutil
import logging
import re
import uuid

# Initialize emscripten environment once
emsdk_path = './lib/emsdk'  # Replace with your actual path
emsdk_env_initialized = False

# Set up logging
logging.basicConfig(level=logging.DEBUG)

JS_DIR_PATH = "./js_temp_folder"
CPP_DIR_PATH = "./cpp_temp_folder"
BASE_DIR = "./lib/emsdk"

def initialize_emscripten_env():
    global emsdk_env_initialized
    if not emsdk_env_initialized:
        # Run emsdk commands to initialize the environment
        command = f'cd {emsdk_path} && ./emsdk install latest && ./emsdk activate latest && source ./emsdk_env.sh'
        subprocess.run(command, shell=True, check=True)
        emsdk_env_initialized = True

def compile_to_cpp(code, cpp_file_path):
    p = subprocess.run(f"g++ {cpp_file_path}", shell=True,capture_output=True)
    logging.debug(p)
    return "done"

def extract_cpp_error(log):
    # Define a regular expression to match the C++ error message
    #cpp_error_pattern = re.compile(r'error:.*\n.*\^\n.*\n1 error generated\.')
    cpp_error_pattern = re.compile(r'error:.*\n.*\n(?:.*\n)+?1 error generated\.', re.DOTALL)

    # Search for the pattern in the log
    match = cpp_error_pattern.search(log)

    # If a match is found, return the matched error message
    if match:
        return match.group(0)
    else:
        # Try a more flexible approach to account for line numbers in the log
        cpp_error_pattern_flexible = re.compile(r'error:.*\n.*\^\n.*\n1 error generated', re.DOTALL)
        match_flexible = cpp_error_pattern_flexible.search(log)
        if match_flexible:
            return match_flexible.group(0)
        else:
            return None

def compile_to_js_and_cleanup(code, cpp_file_path, js_file_path):
    p = subprocess.run(f"source ./{BASE_DIR}/emsdk_env.sh && emcc {cpp_file_path}  -o {js_file_path}", shell=True,capture_output=True)
    logging.debug(p)
    # return p.stderr.splitlines()
    if p.returncode == 1:
        error_as_str = p.stderr.decode('utf-8')
        # Use regular expressions to extract error information
         # Define a regular expression to match the C++ error message
        # cpp_error_pattern = re.compile(r'error:.*\n.*\^.*\n1 error generated\.')
        # match = cpp_error_pattern.search(error_as_str)
        # #match = re.search(r'(\d+:\d+: error:.*)', error_as_str)
        # logging.debug(match)
        # match = extract_cpp_error(error_as_str)
        # if match:
        #     error_text = match
        return {"status": "error", "error_message": error_as_str}
    elif p.returncode == 0:
        # Read the compiled output
        with open(js_file_path, 'r') as compiled_output_file:
            compiled_output = compiled_output_file.read()
            return {"status": "success", "error_message": "null", "compiled_code": compiled_output}

    # # Clean up: Delete the cpp and js files
    # os.remove(cpp_file_path)
    # os.remove(compiled_output_path)
    return "hello"

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

# JS_DIR_PATH = "/js_temp_folder"
# CPP_DIR_PATH = "/cpp_temp_folder"
# BASE_DIR = "./lib/emsdk"
@app.route("/api/compile", methods=['POST'])
def compile_code():

  # Parse the JSON request body
    request_data = request.get_json()
    code = request_data.get('code', '')
    if not code:
        return jsonify({"error": "Invalid request body"}), 400

    _uuid = str(uuid.uuid4())

    initialize_emscripten_env()

    # logging.debug("Request Body: %s", code)

    # Create a temporary folder to store files
    cpp_temp_folder_path = os.path.join(BASE_DIR, CPP_DIR_PATH)
    js_temp_folder_path = os.path.join(BASE_DIR, JS_DIR_PATH)
    
    # Make CPP and JS dir if not made already
    os.makedirs(cpp_temp_folder_path, exist_ok=True)
    os.makedirs(js_temp_folder_path, exist_ok=True)

    # Create a CPP and JS file based on the UUID
    cpp_file_path = os.path.join(cpp_temp_folder_path, f'{_uuid}.cpp')
    js_file_path = os.path.join(js_temp_folder_path, f'{_uuid}.js')

    # Explicitly create the CPP file
    with open(cpp_file_path, 'w') as new_cpp_file:
        new_cpp_file.write(code)

    try:
        # Compile code and get the output
        compiled_output = compile_to_js_and_cleanup(code, cpp_file_path, js_file_path)
        #compiled_output = compile_to_cpp(code,cpp_file_path)
        # Return the compiled output as a JSON response
        return jsonify({"compiled_output": compiled_output})
    except:
         return jsonify({"error": "Compile failed"}), 500
    # finally:
    #     # Clean up: Delete the temporary folder
    #     shutil.rmtree(temp_folder_path, ignore_errors=True)



if __name__ == "__main__":
    # Initialize emscripten environment when the application starts
    initialize_emscripten_env()
    # Run the Flask application
    app.run(debug=True)