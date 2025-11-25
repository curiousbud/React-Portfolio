import React, { useEffect, useState } from 'react';

const getDateString = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  const date = now.toLocaleDateString(undefined, options);
  const time = now.toLocaleTimeString(undefined, { hour12: false });
  return `${date}   ${time}`;
};

const TerminalHeader: React.FC = () => {
  const [dateTime, setDateTime] = useState(getDateString());

  useEffect(() => {
    const interval = setInterval(() => setDateTime(getDateString()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="w-full flex items-center justify-between px-4 py-2 border-b border-(--icon-color) bg-black text-(--icon-color) font-mono text-sm select-none"
      style={{ minHeight: 36 }}
    >
      <span className="flex items-center gap-2">
        <span className="fa-solid fa-sun" style={{ color: 'var(--icon-color)' }}></span>
        Mumbai 27°C
      </span>
      <span className="font-bold tracking-wider">https://areebkhan.me</span>
      <span>{dateTime}</span>
    </header>
  );
};

export default TerminalHeader;
