import yt_dlp

def fetch_video_details(url):
    try:
        # Create yt-dlp object
        ydl_opts = {
            'quiet': True,  # Suppress yt-dlp output
            'format': 'bestvideo+bestaudio',  # Best video + audio formats
            'noplaylist': True,  # Don't download playlists
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            print(f"Video Title: {info['title']}")
            print("Available Formats:")
            
            # Print available formats
            for format in info['formats']:
                print(f"Resolution: {format.get('height', 'N/A')}p, Codec: {format.get('vcodec', 'N/A')}, URL: {format.get('url', 'N/A')}")

    except Exception as e:
        print(f"Failed to fetch video details: {str(e)}")

# Replace with the URL of the video you want to download
fetch_video_details("https://www.youtube.com/watch?v=0V4TiaU06uo")
