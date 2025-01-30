import React, { useState } from "react";
import axios from "axios";
import "./DownloadForm.css";

const DownloadForm = () => {
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/download", {
        url,
      });
      setVideoInfo(response.data);
    } catch (err) {
      setError("Failed to fetch video details. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="download-container">
      <header>
        <h1>YouTube Video Downloader</h1>
      </header>

      <form onSubmit={handleSubmit} className="download-form">
        <h2>Enter YouTube URL</h2>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube link here"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Download Links"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {videoInfo && (
        <div className="video-info">
          <img src={videoInfo.thumbnail} alt="Video Thumbnail" />
          <h3>{videoInfo.title}</h3>
          <h4>Available Formats:</h4>
          <ul>
            {videoInfo.formats.map((format, index) => (
              <li key={index}>
                <a href={format.url} target="_blank" rel="noopener noreferrer">
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

export default DownloadForm;
