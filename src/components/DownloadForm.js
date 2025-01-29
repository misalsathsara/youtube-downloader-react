import React, { useState } from 'react';
import './DownloadForm.css';

const DownloadForm = ({ onFormSubmit }) => {
  const [url, setUrl] = useState('');

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="download-form">
      <h2>Enter Video URL</h2>
      <input
        type="text"
        value={url}
        onChange={handleChange}
        placeholder="Paste video URL here"
        required
      />
      <button type="submit">Get Download Options</button>
    </form>
  );
};

export default DownloadForm;
