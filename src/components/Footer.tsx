import React from 'react';
// import PowerButton from './PowerButton';
// import { Link } from 'react-router-dom';

interface FooterProps {
  onPowerClick?: () => void;
  powerState?: 'off' | 'booting' | 'on' | 'shuttingDown';
  disablePower?: boolean;
}
// { onPowerClick, powerState = 'off', disablePower = false } this goes as a parameter in below function.
const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="footer flex items-center justify-between text-white h-12 border-t border-(--icon-color) mt-4 sticky bottom-0 bg-black z-10000">
      {/* <PowerButton
        onClick={onPowerClick}
        powerState={powerState}
        disabled={disablePower}
      /> */}
      <div className="footerContainer p-0.25rem 0">
        <p className="copyright m-2">
          <span className="copyright-symbol">©</span>
          <span id="currentYear">{new Date().getFullYear()}</span>{' '}
          <a
            href="https://www.linkedin.com/in/curiousbud/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-inherit no-underline"
          >
            Areeb Khan
          </a>{' '}
          | All Rights Reserved
          <span style={{ marginLeft: 16 }}>
            {/* Terminal Demo button removed as per new navigation logic */}
          </span>
        </p>
      </div>
      <div className='h-2'></div>
    </footer>
  );
};

export default Footer;
