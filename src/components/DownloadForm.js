// src/components/DownloadForm.js
import React, { useState } from 'react';
import './DownloadForm.css';

const DownloadForm = ({ onFormSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      onFormSubmit(url);
    }
  };

  return (
    <form className="download-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="url">Enter YouTube Video URL:</label>
        <input
          type="url"
          id="url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          placeholder="Paste URL here"
        />
      </div>
      <button type="submit" className="btn-submit">Download</button>
    </form>
  );
};

export default DownloadForm;
