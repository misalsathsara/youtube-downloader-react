// src/components/Footer/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} YouTube Downloader. All Rights Reserved.</p>
            <div className="social-icons">
                <span className="fab fa-facebook"></span>
                <span className="fab fa-twitter"></span>
                <span className="fab fa-instagram"></span>
            </div>
        </footer>
    );
};

export default Footer;
