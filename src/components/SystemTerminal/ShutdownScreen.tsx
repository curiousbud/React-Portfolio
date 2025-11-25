import React, { useMemo } from 'react';
import './SystemTerminal.css';

function uniqueMessages(messages: string[]) {
  const seen = new Set<string>();
  return messages.filter((msg) => {
    if (seen.has(msg)) return false;
    seen.add(msg);
    return true;
  });
}

interface ShutdownScreenProps {
  messages: string[];
  done?: boolean;
}

const ShutdownScreen: React.FC<ShutdownScreenProps> = ({ messages, done }) => {
  const unique = useMemo(() => uniqueMessages(messages), [messages]);
  const totalChars = 14 * 32; // estimate: 14 lines, ~32 chars each
  const charsTyped = unique.reduce((acc, msg) => acc + msg.length, 0);
  const percent = done ? 100 : Math.min(100, Math.round((charsTyped / totalChars) * 100));
  return (
    <div className="terminal-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <pre className="terminal-text" style={{ textAlign: 'left', fontSize: '1.3rem', margin: '0 auto', minWidth: 400 }}>
        {unique.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </pre>
      <div style={{ width: 320, margin: '2.5rem auto 0 auto', height: 6, background: '#222', borderRadius: 6, overflow: 'hidden', boxShadow: '0 0 8px #000' }}>
        <div style={{ width: `${percent}%`, height: '100%', background: '#f76c6c', transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)', borderRadius: 6 }} />
      </div>
    </div>
  );
};

export default ShutdownScreen;
