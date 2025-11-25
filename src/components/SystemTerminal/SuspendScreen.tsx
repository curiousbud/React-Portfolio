import React from 'react';

import PowerButton from '../PowerButton';
import './SystemTerminal.css';


const SuspendScreen: React.FC<{ onActivate: () => void }> = ({ onActivate }) => (
  <div className="suspend-container">
    <div className="suspend-message">[ SYSTEM SUSPENDED ]</div>
    <div className="suspend-message">Awaiting user reactivation...</div>
    <PowerButton onClick={onActivate} title="Power On" />
  </div>
);

export default SuspendScreen;
