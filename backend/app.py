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
        'format': 'bestvideo+bestaudio',  # Fetch best video and best audio
        'quiet': True,  # Suppress yt-dlp output
        'noplaylist': True,  # Don't download entire playlists
        'merge_output_format': 'mp4',  # Merge video and audio into mp4 format
        'outtmpl': 'downloads/%(id)s.%(ext)s',  # Save video with the ID as the file name
        'headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        'youtube_include_dash_manifest': False,  # Ensure we consider formats with separate streams
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            formats = info.get('formats', [])

            # Log all available formats for debugging
            print("Available formats:")
            for f in formats:
                print(f)

            # Filter to include only formats with both audio and video (best quality video + best quality audio)
            formats = [f for f in formats if f['vcodec'] != 'none' and f['acodec'] != 'none']

            if not formats:
                return jsonify({"error": "No suitable video + audio formats found"}), 404

            return jsonify({"formats": formats})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
