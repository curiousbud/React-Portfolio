import React from 'react';


interface PowerButtonProps {
  onClick?: () => void;
  title?: string;
}

const PowerButton: React.FC<PowerButtonProps> = ({ onClick, title = 'Power Off' }) => {
  return (
    <button
      className=" nav-animated flex items-center justify-center group relative w-16 h-16 m-1 bg-transparent border-none focus:outline-none rounded-full"
      onClick={onClick}
      title={title}
      aria-label={title}
      style={{ boxSizing: 'border-box' }}
    >
      <span className="text-3xl z-2 transition-all duration-500 text-(--clr)  group-hover:drop-shadow-[0_0_20px_var(--icon-color)]">
        ⏻
      </span>
      
    </button>
  );
};

export default PowerButton;