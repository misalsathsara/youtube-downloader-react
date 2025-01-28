import React from 'react';
import './DownloadOptions.css';

const DownloadOptions = ({ formats }) => {
    return (
        <div className="download-options">
            {formats.map((format, index) => (
                <a key={index} href={format.url} download className="download-button">
                    Download {format.format}
                </a>
            ))}
        </div>
    );
};

export default DownloadOptions;