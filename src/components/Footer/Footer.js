// src/components/Footer/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} QuickTube. All rights reserved.</p>
      <nav className="footer-nav">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </nav>
    </footer>
  );
};

export default Footer;