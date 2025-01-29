// src/components/DownloadForm.js
import React, { useState } from 'react';
import './DownloadForm.css';

const DownloadForm = ({ onFormSubmit }) => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation
    if (typeof onFormSubmit === 'function') {
      onFormSubmit(videoUrl.trim());
    } else {
      console.error('No submit handler found');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="download-form">
      <input
        type="url"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Paste YouTube URL here"
        pattern="^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+"
        required
      />
      <button type="submit">Show Download Options</button>
    </form>
  );
};

export default DownloadForm;