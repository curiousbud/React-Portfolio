// System states for SystemTerminal
export const SYSTEM_STATES = {
  RUNNING: 'RUNNING',
  SHUTTING_DOWN: 'SHUTTING_DOWN',
  SUSPENDED: 'SUSPENDED',
  STARTING_UP: 'STARTING_UP',
} as const;
export type SystemState = typeof SYSTEM_STATES[keyof typeof SYSTEM_STATES];
