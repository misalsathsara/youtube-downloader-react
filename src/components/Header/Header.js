// src/components/Header/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">YouTube Downloader</div>
            <nav>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/features">Features</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
