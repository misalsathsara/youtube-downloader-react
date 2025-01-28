import React, { useState } from 'react';
import './DownloadForm.css';

const DownloadForm = ({ onFormSubmit }) => {
    const [videoUrl, setVideoUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(videoUrl);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Paste YouTube Video URL here"
                required
            />
            <button type="submit">Get Download Options</button>
        </form>
    );
};

export default DownloadForm;