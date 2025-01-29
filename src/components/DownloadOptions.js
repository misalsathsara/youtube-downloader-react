import React from 'react';
import './DownloadOptions.css';

const DownloadOptions = ({ formats }) => {
  return (
    <div className="download-options">
      <h3 className="download-options-title">Available Formats:</h3>
      <ul className="format-list">
        {formats.length > 0 ? (
          formats.map((format) => (
            <li key={format.format_id} className="format-item">
              <a className="download-link" href={format.url} download>
                <span className="format-info">
                  {format.height ? `${format.height}p` : ''} 
                  {format.abr ? ` - ${format.abr}kbps audio` : ' - Audio Only'}
                </span>
                {format.format_note && <span className="format-note">({format.format_note})</span>}
              </a>
            </li>
          ))
        ) : (
          <p className="no-formats">No suitable formats found.</p>
        )}
      </ul>
    </div>
  );
};

export default DownloadOptions;
