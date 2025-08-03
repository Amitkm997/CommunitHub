import React from 'react';
import '../css/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} CommunityHub. All rights reserved.</p>
    </footer>
  );
}
