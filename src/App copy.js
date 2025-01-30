import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [error, setError] = useState("");

  const fetchVideoDetails = async () => {
    setError("");
    setVideoInfo(null);

    if (!url.trim()) {
      setError("Please enter a YouTube URL.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/download", { url });
      setVideoInfo(response.data);
    } catch (err) {
      setError("Failed to fetch video details. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#121212", color: "white", minHeight: "100vh" }}>
      <h2>YouTube Video Downloader</h2>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ padding: "10px", width: "60%", marginBottom: "10px" }}
      />
      <button onClick={fetchVideoDetails} style={{ padding: "10px 20px", marginLeft: "10px", cursor: "pointer" }}>
        Get Video
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {videoInfo && (
        <div style={{ marginTop: "20px", padding: "20px", backgroundColor: "#222", borderRadius: "10px" }}>
          <h3>{videoInfo.title}</h3>
          <img src={videoInfo.thumbnail} alt="Thumbnail" style={{ width: "200px", borderRadius: "10px" }} />
          <h4>Available Formats:</h4>
          <ul>
            {videoInfo.formats.map((format, index) => (
              <li key={index}>
                <a href={format.url} target="_blank" rel="noopener noreferrer" style={{ color: "cyan" }}>
                  Download {format.resolution}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
