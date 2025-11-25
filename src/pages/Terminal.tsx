
import React, { useEffect, useState } from 'react';
import ReactConsole from 'react-console-emulator';
import figlet from 'figlet';
import axios from 'axios';
import styles from './TerminalPage.module.css';

const directories = {
  education: [
    '* BSc Computer Science, Example University (2015-2019)',
    '* MSc Software Engineering, Example University (2019-2021)',
  ],
  projects: [
    '* React Portfolio',
    '* Terminal Emulator',
    '* Open Source Contributions',
  ],
  skills: [
    '* JavaScript',
    '* TypeScript',
    '* React',
    '* Node.js',
  ],
};
const files = ['joke', 'credits'];
const root = '~';

const user = 'visitor';
const server = 'iabhinav.me';

function getPrompt(cwd: string) {
  return `${user}@${server}:${cwd}$`;
}

const Terminal: React.FC = () => {

  const [greeting, setGreeting] = useState('');
  const [cwd, setCwd] = useState(root);
  const [dateTime, setDateTime] = useState('');
  const temperature = 'Mumbai 27°C';

  useEffect(() => {
    figlet.text('ABHINAV', { font: 'Standard' }, (_err, data) => {
      setGreeting((data || 'ABHINAV'));
    });
    // Date/time updater
    const updateDateTime = () => {
      const now = new Date();
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const day = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const hour = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      const sec = String(now.getSeconds()).padStart(2, '0');
      setDateTime(`${month} ${day}th, ${year}  ${hour}:${min}:${sec}`);
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const commands = {
    help: {
      description: 'List available commands',
      usage: 'help',
      fn: () => {
        return 'help, echo, ls, cd, joke, credits, clear';
      },
    },
    echo: {
      description: 'Echo input',
      usage: 'echo [text]',
      fn: (...args: string[]) => args.join(' '),
    },
    ls: {
      description: 'List directories/files',
      usage: 'ls',
      fn: () => {
        if (cwd === root) {
          return Object.keys(directories).concat(files).join('  ');
        } else {
          const dir = cwd.replace('~/', '');
          return directories[dir as keyof typeof directories]?.join('\n') || 'No such directory';
        }
      },
    },
    cd: {
      description: 'Change directory',
      usage: 'cd [dir]',
      fn: (dir: string) => {
        if (!dir || dir === '~') {
          setCwd(root);
          return 'Moved to home directory';
        }
        if (Object.keys(directories).includes(dir)) {
          setCwd(`~/${dir}`);
          return `Moved to ${dir}`;
        }
        if (dir === '..') {
          setCwd(root);
          return 'Moved to home directory';
        }
        return 'No such directory';
      },
    },
    joke: {
      description: 'Get a programming joke',
      usage: 'joke',
      fn: async () => {
        try {
          const res = await axios.get('https://v2.jokeapi.dev/joke/Programming');
          if (res.data.type === 'twopart') {
            return `Q: ${res.data.setup}\nA: ${res.data.delivery}`;
          }
          return res.data.joke;
        } catch {
          return 'Failed to fetch a joke.';
        }
      },
    },
    credits: {
      description: 'Show credits',
      usage: 'credits',
      fn: () =>
        'Used libraries:\n* react-console-emulator\n* figlet\n* axios\nInspired by freeCodeCamp terminal portfolio tutorial',
    },
  };


  return (
    <div className={styles['terminal-root']} style={{ background: '#000', minHeight: '100vh', width: '100vw', fontFamily: 'Consolas, monospace', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 0 }}>
      {/* Top Bar */}
      <div style={{ width: '100%', background: '#000', color: '#bfc9d4', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #222', height: 32, padding: '0 1.5rem', fontFamily: 'Consolas, monospace' }}>
        <span style={{ fontSize: '0.95rem' }}>{temperature}</span>
        <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', letterSpacing: 1 }}>{'https://iabhinav.me'}</span>
        <span style={{ fontSize: '0.95rem' }}>{dateTime}</span>
      </div>

      {/* Main Terminal Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <div style={{ margin: '2.5rem 0 1.5rem 0', textAlign: 'center', width: '100%' }}>
          <pre style={{ color: '#fff', fontSize: '2.2rem', lineHeight: 1, margin: 0, fontFamily: 'Consolas, monospace', textShadow: '0 0 8px #222' }}>{greeting}</pre>
          <div style={{ color: '#fff', fontSize: '1.2rem', marginTop: 16, fontFamily: 'Consolas, monospace', fontWeight: 600 }}>
            Welcome to Abhinav's Terminal Portfolio
          </div>
          <div style={{ color: '#bfc9d4', fontSize: '1rem', marginTop: 12, fontFamily: 'Consolas, monospace' }}>
            Type <span style={{ color: '#fff' }}>'?'</span> or <span style={{ color: '#fff' }}>'help'</span> to view a list of available commands.
          </div>
        </div>
        <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', background: 'transparent', borderRadius: 8, boxShadow: 'none' }}>
          <ReactConsole
            welcomeMessage={''}
            promptLabel={<span style={{ color: '#bfc9d4' }}>{getPrompt(cwd)}{' '}</span>}
            commands={commands}
            autoFocus
            noDefaults
            style={{ background: 'transparent', color: '#fff', fontFamily: 'Consolas, monospace', fontSize: '1.15rem', boxShadow: 'none', border: 'none', padding: 0 }}
            inputTextStyle={{ color: '#fff', fontFamily: 'Consolas, monospace' }}
            promptLabelStyle={{ color: '#bfc9d4', fontFamily: 'Consolas, monospace' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
