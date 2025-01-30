from flask import Flask, request, jsonify
import yt_dlp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/download', methods=['POST'])
def get_video_info():
    try:
        data = request.get_json()
        video_url = data.get("url")

        if not video_url:
            return jsonify({"error": "No URL provided"}), 400

        # Define yt-dlp options with format preferences
        ydl_opts = {
            'quiet': False,  # Show output for debugging
            'verbose': True,  # Enable verbose logging
            'format': 'bestvideo+bestaudio/best',  # Use best video and best audio
            'noplaylist': True,
            'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',  # Custom user agent
            'referer': 'https://www.youtube.com/',  # Add referrer to mimic browser requests
            'merge_output_format': 'mp4',  # Ensure the output is in MP4 format
            'force-ipv4': True,  # Optionally, force IPv4 if IPv6 is an issue
            'hls_prefer_native': True,  # Prefer native formats over HLS
            'prefer_free_formats': True,  # Prefer free formats over paid ones
            'outtmpl': 'downloads/%(id)s.%(ext)s',  # Save video with ID as the file name
            'postprocessors': [
                {
                    'key': 'FFmpegVideoConvertor',  # Use FFmpeg to merge video and audio
                }
            ]
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # Try extracting information
            try:
                info = ydl.extract_info(video_url, download=True)  # Set download=True to download video and audio
            except Exception as e:
                print(f"yt-dlp error: {str(e)}")  # Log yt-dlp specific error
                return jsonify({"error": f"yt-dlp failed: {str(e)}"}), 500

            # Log the output of the info variable
            print(f"Extracted video details: {info}")  # Debug output for video details

            if 'formats' not in info:
                raise ValueError("No formats found for the video.")
                
            formats = info.get('formats', [])

            # Log available formats for debugging
            print(f"Available formats: {formats}")  # Debug output for formats

            # Filter out any formats related to .m3u8 (HLS streaming) and image URLs like i.ytimg.com
            filtered_formats = [
                {"resolution": f.get("height", "Audio"), "url": f["url"]}
                for f in formats
                if f.get("url") and not (".m3u8" in f["url"] or "i.ytimg.com" in f["url"])
            ]

        return jsonify({
            "title": info.get("title"),
            "thumbnail": info.get("thumbnail"),
            "formats": filtered_formats  # Return only filtered formats
        })

    except Exception as e:
        print(f"Error fetching video details: {e}")  # Log error in backend console
        return jsonify({"error": f"Failed to fetch video details: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
