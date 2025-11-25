


import React, { useEffect, useState } from 'react';
import ReactConsole from 'react-console-emulator';
import { terminalCommands } from '../terminal/commands';
import CONFIG from '../../gitprofile.config';


const root = '~';

const logoAscii = `
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                            .:-=--=--::::.                                          
                                     .-==+++++++++++++++++++=-:                                     
                                 .-++++++++++++++++++++++++++++++=-.                                
                              :=+++++++==:.             .::=+++++++++=:                             
                           :=++++++=:                          .-=++++++=.                          
                         :++++++-.                                 .:++++++-                        
                       :+++++=.                                       .=+++++:                      
                      +++++-                                            .=+++++.                    
                    -++++=                     =++++++                    .=++++=                   
                   =++++:                     =++++++++                     :+++++.                 
                 .++++=                      -++++++++++                      =++++:                
                .++++-                      :++++++++++++                      -++++:               
                ++++:                      .+++++++++++++=                      -++++:              
               ++++-                       +++++++++++++++-                      -++++.             
              =+++=                       +++++++++++++++++:                      -++++             
             :++++                       +++++++++ -++++++++.                      =+++-            
             ++++:                      =++++++++   =++++++++                      .++++            
             ++++                      =++++++++     =++++++++                      =+++:           
            =+++-                     :++++++++.      +++++++++                     .+++=           
            =+++.                    .++++++++:        ++++++++=                     ++++           
            ++++                    .++++++++-         :++++++++:                    ++++           
            ++++                    ++++++++=                                        ++++           
            ++++                   +++++++++  =+++++++++++++++++++.                  ++++           
            ++++                  =++++++++  ++++++++++++++++++++++                  ++++           
            =+++-                =++++++++  =+++++++++++++++++++++++                 ++++           
            :++++               :++++++++. -+++++++++++++++++++++++++               :+++=           
             ++++.             :++++++++:  ::::::::::::::::::::::::::               ++++:           
             =++++            .++++++++-                      ---=---=:            .++++            
              ++++-           ++++++++=                       :++++++++:           ++++:            
              :++++.         +++++++++                         -++++++++.         =+++=             
               =++++        +++++++++                           =++++++++        =++++              
                +++++      =++++++++                             +++++++++      =++++               
                 +++++.   -++++++++.                              +++++++++    =++++                
                  =++++-  .:.::::.                                 .:::::::   +++++                 
                   -++++=.                                                  =++++=                  
                     +++++=                                               :+++++:                   
                      :+++++=                                           :+++++=                     
                        -++++++:                                      -+++++=.                      
                          =++++++=:.                              .:++++++=.                        
                            :++++++++=:                       ::=+++++++:                           
                               :=+++++++++===:::.    ..::-=+++++++++=-                              
                                   :=+++++++++++++++++++++++++++=-.                                 
                                       :-===++++++++++++++==:.                                      
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
`;

const user = 'visitor';
const server = 'iabhinav.me';

function getPrompt(cwd: string) {
  return `${user}@${server}:${cwd}$`;
}



const asciiName = `
█████╗  ██████╗  ██╗  ██╗ ██╗ ███╗  ██╗  █████╗  ██╗   ██╗
██╔══██╗ ██╔══██╗ ██║  ██║ ██║ ████╗ ██║ ██╔══██╗ ██║   ██║
███████║ ██████╔╝ ███████║ ██║ ██╔██╗██║ ███████║ ██║   ██║
██╔══██║ ██╔══██╗ ██╔══██║ ██║ ██║╚████║ ██╔══██║ ╚██╗ ██╔╝
██║  ██║ ██████╔╝ ██║  ██║ ██║ ██║ ╚███║ ██║  ██║  ╚████╔╝
╚═╝  ╚═╝ ╚═════╝  ╚═╝  ╚═╝ ╚═╝ ╚═╝  ╚══╝ ╚═╝  ╚═╝   ╚═══╝
`;

const Terminal: React.FC = () => {
  const [dateTime, setDateTime] = useState('');
  const name = `${CONFIG.home?.firstName || ''} ${CONFIG.home?.lastName || ''}`.trim() || 'Abhinav';

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDateTime(now.toLocaleString());
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);



  // Merge built-in navigation commands with dynamic terminal commands
  const commands = {
    ...terminalCommands,
    echo: {
      description: 'Echo input',
      usage: 'echo [text]',
      fn: (...args: string[]) => args.join(' '),
    },
    clear: {
      description: 'Clear terminal',
      usage: 'clear',
      fn: (terminal: unknown) => {
        if (
          terminal &&
          typeof terminal === 'object' &&
          'clearStdout' in terminal &&
          typeof (terminal as { clearStdout?: () => void }).clearStdout === 'function'
        ) {
          (terminal as { clearStdout: () => void }).clearStdout();
        }
        return '';
      },
    },
  };

  return (
    <div style={{ background: '#000', minHeight: '100vh', width: '100vw', fontFamily: 'JetBrains Mono, Consolas, monospace', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 0 }}>
      {/* Header */}
      <header style={{ width: '100%', background: '#000', color: '#fff', borderBottom: '1px solid #222', padding: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 48, padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Weather placeholder */}
            <span style={{ fontSize: '1rem', color: '#bfc9d4' }}>Mumbai 27°C</span>
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', letterSpacing: 1 }}>
            <a href="https://iabhinav.me" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>https://iabhinav.me</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Power icon */}
            <span title="Power Off" style={{ fontSize: 22, cursor: 'pointer', color: '#bfc9d4', marginRight: 8 }}>⏻</span>
            <span style={{ fontSize: '1rem', color: '#bfc9d4' }}>{dateTime}</span>
          </div>
        </div>
      </header>

      {/* Main Content: ASCII logo, name, welcome, instructions, terminal */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: '100%', overflow: 'hidden', background: '#000' }}>
        <div className="ascii-container" style={{ marginTop: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <pre className="main-logo" style={{ color: '#fff', fontSize: '0.85rem', lineHeight: 1.05, margin: 0, fontFamily: 'JetBrains Mono, Consolas, monospace', textShadow: '0 0 8px #222', userSelect: 'text', whiteSpace: 'pre', maxWidth: '100vw', overflowX: 'auto' }}>{logoAscii}</pre>
          <div className="ascii-name" style={{ color: '#fff', fontSize: '1.15rem', margin: '18px 0 0 0', fontFamily: 'JetBrains Mono, Consolas, monospace', fontWeight: 700, textAlign: 'center', whiteSpace: 'pre' }}>{asciiName}</div>
          <div style={{ color: '#fff', fontSize: '1.25rem', marginTop: 12, fontFamily: 'JetBrains Mono, Consolas, monospace', fontWeight: 700, textAlign: 'center' }}>
            Welcome to {name}'s Terminal Portfolio
          </div>
        </div>
        <div style={{ color: '#bfc9d4', fontSize: '1.15rem', marginTop: 32, fontFamily: 'JetBrains Mono, Consolas, monospace', textAlign: 'center' }}>
          Type <span style={{ color: '#fff' }}>'?'</span> or <span style={{ color: '#fff' }}>'help'</span> to view a list of available commands.
        </div>
        {/* Terminal area, scrollable only when needed */}
        <div style={{ width: '100%', maxWidth: 900, margin: '32px auto 0 auto', background: 'rgba(30,30,30,0.95)', borderRadius: 14, boxShadow: '0 0 0 1px #222', overflow: 'auto', minHeight: 180, maxHeight: 420, padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <ReactConsole
            welcomeMessage={''}
            promptLabel={<span style={{ color: '#bfc9d4' }}>{getPrompt(root)}{' '}</span>}
            commands={commands}
            autoFocus
            noDefaults
            style={{ background: 'transparent', color: '#fff', fontFamily: 'JetBrains Mono, Consolas, monospace', fontSize: '1.15rem', boxShadow: 'none', border: 'none', padding: 0, minHeight: 180, maxHeight: 420, overflowY: 'auto' }}
            inputTextStyle={{ color: '#fff', fontFamily: 'JetBrains Mono, Consolas, monospace' }}
            promptLabelStyle={{ color: '#bfc9d4', fontFamily: 'JetBrains Mono, Consolas, monospace' }}
          />
        </div>
      </main>
      {/* Footer */}
      <footer style={{ width: '100%', background: '#000', color: '#fff', borderTop: '1px solid #222', padding: 0, marginTop: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 40 }}>
          <p style={{ margin: 0, fontSize: '1rem', color: '#fff', fontFamily: 'JetBrains Mono, Consolas, monospace' }}>
            <span style={{ marginRight: 4 }}>©</span>
            <span>{new Date().getFullYear()}</span> <a href="https://iabhinav.me?utm_source=terminal" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Abhinav Jaiswal</a> | All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Terminal;
