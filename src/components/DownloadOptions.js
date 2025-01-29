// src/components/DownloadOptions.js
import React from 'react';
import './DownloadOptions.css';

const DownloadOptions = ({ formats }) => {
  return (
    <div className="download-options">
      <h2>Available Download Formats</h2>
      <ul className="formats-list">
        {formats.map((format, index) => (
          <li key={index} className="format-item">
            <div className="format-info">
              <span className="format-type">{format.format}</span>
              <span className="resolution">{format.resolution || 'No resolution info'}</span>
            </div>
            <a href={format.url} download className="btn-download">
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DownloadOptions;
