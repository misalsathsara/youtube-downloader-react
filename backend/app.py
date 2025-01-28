from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import yt_dlp
import os

app = Flask(__name__, static_folder="../frontend")
CORS(app)  # Allow cross-origin requests

# Serve the frontend files
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

# Handle video download requests
@app.route('/download', methods=['POST'])
def download():
    video_url = request.json.get('url')
    if not video_url:
        return jsonify({"error": "URL is required"}), 400

    ydl_opts = {
        'format': 'best',  # Fetch the best available quality
        'quiet': True,     # Suppress yt-dlp output
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            formats = info.get('formats', [])
            return jsonify({"formats": formats})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)