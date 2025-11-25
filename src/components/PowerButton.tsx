import React from 'react';


interface PowerButtonProps {
  onClick?: () => void;
  title?: string;
  powerState?: 'off' | 'booting' | 'on' | 'shuttingDown';
  disabled?: boolean;
}

const PowerButton: React.FC<PowerButtonProps> = ({ onClick, title, powerState = 'off', disabled = false }) => {
  // Icon and color based on state
  let icon = '⏻';
  let color = '#c6f7e2';
  let btnTitle = title;
  if (powerState === 'booting') {
    icon = '⏳';
    color = '#f7c46c';
    btnTitle = 'Starting...';
  } else if (powerState === 'shuttingDown') {
    icon = '⏳';
    color = '#f76c6c';
    btnTitle = 'Shutting down...';
  } else if (powerState === 'on') {
    icon = '⏻';
    color = '#44D544';
    btnTitle = 'Power Off';
  } else if (powerState === 'off') {
    icon = '⏻';
    color = '#c6f7e2';
    btnTitle = 'Power On';
  }
  return (
    <button
      className="nav-animated flex items-center justify-center group relative w-16 h-16 m-1 bg-transparent border-none focus:outline-none rounded-full"
      onClick={disabled ? undefined : onClick}
      title={btnTitle}
      aria-label={btnTitle}
      style={{ boxSizing: 'border-box', color, opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
      disabled={disabled}
    >
      <span className="text-3xl z-2 transition-all duration-500 group-hover:drop-shadow-[0_0_20px_var(--icon-color)]">
        {icon}
      </span>
    </button>
  );
};

export default PowerButton;