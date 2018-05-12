import activationMiddleware from './activationMiddleware';
import archiveMiddleware from './archiveMiddleware';
import keyboardShortcutMiddleware from './keyboardShortcutMiddleware';
import noSleepMiddleware from './noSleepMiddleware';
import settingsMiddleware from './settingsMiddleware';
import scrambleMiddleware from './scrambleMiddleware';
import timerMiddleware from './timerMiddleware';
import timesMiddleware from './timesMiddleware';

export default [
  activationMiddleware,
  archiveMiddleware,
  keyboardShortcutMiddleware,
  noSleepMiddleware,
  settingsMiddleware,
  scrambleMiddleware,
  timerMiddleware,
  timesMiddleware
];
