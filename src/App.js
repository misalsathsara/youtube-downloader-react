import React, { useState } from 'react';
import Header from './components/Header';
import DownloadForm from './components/DownloadForm';
import DownloadOptions from './components/DownloadOptions';
import Footer from './components/Footer';
import './App.css';

const App = () => {
    const [formats, setFormats] = useState([]);

    const handleFormSubmit = async (videoUrl) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: videoUrl })
            });

            const data = await response.json();
            if (data.error) {
                alert(data.error);
                return;
            }

            setFormats(data.formats);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="App">
            <Header />
            <div className="container">
                <DownloadForm onFormSubmit={handleFormSubmit} />
                <DownloadOptions formats={formats} />
            </div>
            <Footer />
        </div>
    );
};

export default App;