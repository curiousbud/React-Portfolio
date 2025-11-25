import React from 'react';
import PowerButton from './PowerButton';

const Footer: React.FC = () => {
  return (
    <footer className=" footer flex items-center justify-between text-white h-12">
      <PowerButton />
      <div className="footerContainer p-0.25rem 0">
        <p className="copyright m-2">
          <span className="copyright-symbol">©</span>
          <span id="currentYear">{new Date().getFullYear()}</span>{' '}
          <a
            href="https://www.linkedin.com/in/curiousbud/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Areeb Khan
          </a>{' '}
          | All Rights Reserved
        </p>
      </div>
      <div className='h-2'></div>
    </footer>
  );
};

export default Footer;
