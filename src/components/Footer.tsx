import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <p className="copyright" style={{ margin: '5px' }}>
          <span className="copyright-symbol">©</span>
          <span id="currentYear">{new Date().getFullYear()}</span>{' '}
          <a
            href="https://iabhinav.me?utm_source=terminal"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Abhinav Jaiswal
          </a>{' '}
          | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
