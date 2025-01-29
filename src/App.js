// src/App.js
import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DownloadForm from './components/DownloadForm';
import DownloadOptions from './components/DownloadOptions';
import './App.css';

function App() {
  const [formats, setFormats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownloadSubmit = async (url) => {
    setLoading(true);
    setError('');
    setFormats([]);

    try {
      const response = await fetch('http://127.0.0.1:5000/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormats(data.formats);
      } else {
        throw new Error(data.error || 'Failed to fetch formats');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <DownloadForm onFormSubmit={handleDownloadSubmit} />
        {loading && <p className="loading">Fetching available formats...</p>}
        {error && <p className="error">{error}</p>}
        {formats.length > 0 && <DownloadOptions formats={formats} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
