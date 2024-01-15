# from flask import Flask,request, jsonify, send_file, send_from_directory
# from constants import GCLOUD_CLOUD_RUN

# app = Flask(__name__)


# @app.route("/api/example", methods=['GET'])
# def example():
#     return jsonify({"status": "Success"}), 200


# @app.route("/api/compile", methods=['POST'])
# def compile_code():
#     request_data = request.get_json()
#     code = request_data.get('code', '')
#     if not code:
#         return jsonify({"error": "Invalid request body"}), 400
    



# @app.route("/api/download", methods=['POST'])
# def download_code():
#     pass


# if __name__ == "__main__":
#     # Run the Flask application
#     app.run(debug=True)