
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { SystemTerminal } from '../components/SystemTerminal';
import Terminal from './Terminal';


// Power states: 'off', 'booting', 'on', 'shuttingDown'
type PowerState = 'off' | 'booting' | 'on' | 'shuttingDown';

function TerminalPage() {
  const [powerState, setPowerState] = useState<PowerState>('on');
  const [showShutdown, setShowShutdown] = useState(false);
  const navigate = useNavigate();


  // Power button logic: only allow shutdown
  const handlePowerClick = () => {
    if (powerState === 'on') {
      setPowerState('shuttingDown');
      setShowShutdown(true);
    }
  };

  // After shutdown loading, go back to portfolio
  const handleShutdownComplete = () => {
    setShowShutdown(false);
    setPowerState('on');
    navigate('/');
  };

  // Show shutdown overlay if needed
  return (
    <>
      <Terminal />
      <Footer onPowerClick={handlePowerClick} powerState={powerState} disablePower={showShutdown} />
      {showShutdown && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'all' }}>
          <SystemTerminal initialMode="shutdown" onShutdownComplete={handleShutdownComplete} />
        </div>
      )}
    </>
  );
}

export default TerminalPage