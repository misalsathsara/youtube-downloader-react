import React from 'react';
import './DownloadOptions.css';

const DownloadOptions = ({ formats }) => {
  return (
    <div className="download-options">
      <h3>Available Download Options:</h3>
      {formats.map((format, index) => (
        <a
          key={index}
          href={format.url}
          download
          className="download-button"
        >
          {`Download ${format.ext} (${format.format_id})`}
        </a>
      ))}
    </div>
  );
};

export default DownloadOptions;
