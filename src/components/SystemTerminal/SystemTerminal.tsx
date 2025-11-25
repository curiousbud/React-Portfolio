import React, { useState } from 'react';
import ShutdownScreen from './ShutdownScreen';
import SuspendScreen from './SuspendScreen';
import StartupScreen from './StartupScreen';
import './SystemTerminal.css';


import { SYSTEM_STATES } from './systemStates';
import type { SystemState } from './systemStates';

const shutdownMessages = [
  '[ OK ] Stopping Network Manager...',
  '[ OK ] Disconnecting active network interfaces...',
  '[ OK ] Stopping User Sessions...',
  '[ OK ] Terminating background services...',
  '[ OK ] Stopping System Logging...',
  '[ OK ] Stopping Authorization Manager...',
  '[ OK ] Saving system clock...',
  '[ OK ] Unmounting /home...',
  '[ OK ] Unmounting /var...',
  '[ OK ] Disabling Swap...',
  '[ OK ] All file systems unmounted.',
  '[ * ] Reached target Shutdown.',
  '[ ] Powering off...',
  'SYSTEM IS GOING TO SLEEP NOW.',
];

const startupMessages = [
  '[SYSTEM] Resuming Network Manager...',
  '[NETWORK] Connection restored',
  '[DEVICE] Filesystems mounted',
  '[SECURITY] Firewalls active',
  'GETTING SYSTEM READY...'
];

interface SystemTerminalProps {
  onResume?: () => void;
  onShutdownComplete?: () => void;
  onStartupComplete?: () => void;
  initialMode?: 'startup' | 'shutdown';
}


const SystemTerminal: React.FC<SystemTerminalProps> = ({ onResume, onShutdownComplete, onStartupComplete, initialMode = 'shutdown' }) => {
  const [systemState, setSystemState] = useState<SystemState>(
    initialMode === 'startup' ? SYSTEM_STATES.STARTING_UP : SYSTEM_STATES.SHUTTING_DOWN
  );
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [startupDone, setStartupDone] = useState(false);
  const [shutdownDone, setShutdownDone] = useState(false);

  // Simulate typewriter sequence with typing effect and total duration ~7.5s
  const simulateSequence = (messages: string[], nextState: SystemState, callback?: () => void, mode?: 'startup' | 'shutdown') => {
    setDisplayText([]);
    if (mode === 'startup') setStartupDone(false);
    if (mode === 'shutdown') setShutdownDone(false);
    const totalDuration = 7500; // ms
    const chars = messages.reduce((acc, msg) => acc + msg.length, 0);
    const perChar = Math.max(20, Math.floor(totalDuration / chars));
    let shown: string[] = [];
    function typeNext(msgIdx: number, charIdx: number) {
      if (msgIdx >= messages.length) {
        if (mode === 'startup') setStartupDone(true);
        if (mode === 'shutdown') setShutdownDone(true);
        setTimeout(() => {
          setSystemState(nextState);
          setDisplayText([]);
          if (callback) callback();
        }, 500);
        return;
      }
      const msg = messages[msgIdx];
      if (charIdx === 0) shown = [...shown, ''];
      shown = shown.slice(0, msgIdx).concat((shown[msgIdx] || '') + msg[charIdx]);
      setDisplayText([...shown]);
      if (charIdx < msg.length - 1) {
        setTimeout(() => typeNext(msgIdx, charIdx + 1), perChar);
      } else {
        setTimeout(() => typeNext(msgIdx + 1, 0), perChar * 2);
      }
    }
    typeNext(0, 0);
  };


  // Start shutdown or startup sequence on mount
  React.useEffect(() => {
    if (systemState === SYSTEM_STATES.SHUTTING_DOWN) {
      simulateSequence(shutdownMessages, SYSTEM_STATES.SUSPENDED, onShutdownComplete, 'shutdown');
    } else if (systemState === SYSTEM_STATES.STARTING_UP) {
      simulateSequence(startupMessages, SYSTEM_STATES.RUNNING, onStartupComplete, 'startup');
    }
    // eslint-disable-next-line
  }, [systemState]);

  // Handle resume (power button click)
  const handleResume = () => {
    setSystemState(SYSTEM_STATES.STARTING_UP);
    simulateSequence(startupMessages, SYSTEM_STATES.RUNNING, onResume);
  };

  if (systemState === SYSTEM_STATES.SHUTTING_DOWN) {
    return <ShutdownScreen messages={displayText} done={shutdownDone} />;
  }
  if (systemState === SYSTEM_STATES.SUSPENDED) {
    return <SuspendScreen onActivate={handleResume} />;
  }
  if (systemState === SYSTEM_STATES.STARTING_UP) {
    return <StartupScreen messages={displayText} done={startupDone} />;
  }
  return null;
};

export default SystemTerminal;
