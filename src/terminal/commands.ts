// src/terminal/commands.ts
// All terminal commands as per the screenshot, stub implementations for now.
import CONFIG from '../../gitprofile.config';

const dynamicList = (arr: any[], fields: string[]) =>
  arr.length === 0 ? 'No data found.' : arr.map(item => fields.map(f => item[f]).filter(Boolean).join(' - ')).join('\n');

const commandList = [
  'abhinav', 'about', 'age', 'antonym', 'ascii', 'asciiqr', 'base64', 'calendar',
  'capitalize', 'clear', 'coin', 'commands', 'contact', 'countdays', 'country', 'curl',
  'date', 'define', 'dns', 'dnslookup', 'emoji', 'geo', 'github', 'hash', 'help', 'history',
  'ip', 'json', 'lowercase', 'matrix', 'ping', 'projects', 'qr', 'quote', 'remind', 'reset',
  'reverse', 'rps', 'set', 'shorten', 'shutdown', 'social', 'stock', 'stopwatch', 'synonym',
  'sysinfo', 'theme', 'time', 'timer', 'translate', 'ttt', 'uppercase', 'uptime', 'username',
  'uuid', 'weather', 'whoami'
];

function formatHelpMenu() {
  // 7 columns, fill left to right
  const cols = 7;
  const rows = Math.ceil(commandList.length / cols);
  let lines = [];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      const idx = c * rows + r;
      if (idx < commandList.length) {
        row.push(commandList[idx].padEnd(12, ' '));
      }
    }
    lines.push(row.join(' '));
  }
  return [
    '💡 Terminal Help Menu:',
    '',
    ...lines,
    '',
    '💡 Tip:',
    '  • Use help <command> (e.g. help abhinav) to see command details.',
    '  • Use Tab for auto-completion and arrow keys (↑ or ↓) to navigate command history.'
  ].join('\n');
}

export const terminalCommands = {
  abhinav: {
    description: 'About Areeb Khan',
    fn: () => `${CONFIG.home?.firstName || 'Areeb'} ${CONFIG.home?.lastName || 'Khan'}, ${CONFIG.home?.headline || ''}`.trim()
  },
  about: {
    description: 'About Me',
    fn: () => CONFIG.aboutMe?.description || 'No about info.'
  },
  age: {
    description: 'Show age',
    fn: () => 'Age: Not specified in config.'
  },
  antonym: {
    description: 'Show antonym (stub)',
    fn: () => 'Antonym command is a stub.'
  },
  ascii: {
    description: 'Show ASCII art (stub)',
    fn: () => 'ASCII art command is a stub.'
  },
  asciiqr: {
    description: 'Show ASCII QR (stub)',
    fn: () => 'ASCII QR command is a stub.'
  },
  base64: {
    description: 'Base64 encode/decode (stub)',
    fn: () => 'Base64 command is a stub.'
  },
  calendar: {
    description: 'Show calendar (stub)',
    fn: () => 'Calendar command is a stub.'
  },
  skills: {
    description: 'List skills',
    fn: () => dynamicList(CONFIG.skills, ['name'])
  },
  education: {
    description: 'List education',
    fn: () => dynamicList(CONFIG.educations, ['degree', 'institution', 'from', 'to'])
  },
  projects: {
    description: 'List projects',
    fn: () => CONFIG.projects?.github?.display ? 'See portfolio projects section.' : 'No projects.'
  },
  help: {
    description: 'Show help',
    fn: () => formatHelpMenu()
  },
  '?': {
    description: 'Show help',
    fn: () => formatHelpMenu()
  },
  ls: {
    description: 'List commands',
    fn: () => commandList.join('  ')
  },
  // Add more commands as needed
};
