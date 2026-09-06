import createLogger from './index.js';

const logger = createLogger();
const loggerVerbose = createLogger('verbose');
const loggerDebug = createLogger('debug');
const loggerInfo = createLogger('info', { typed: true });
const loggerWarn = createLogger('warn', { timestamp: true, typed: true });
const loggerError = createLogger('error', {
  timestamp: true,
  typed: true,
  callback: (...args) => {
    logger.info('callback', ...args);
  },
});

logger.debug('default', 'OK');
loggerVerbose.info('verbose', 'OK');
loggerDebug.debug('debug', 'OK');
loggerInfo.info('info', 'OK');
loggerWarn.warn('warn', 'OK');
loggerError.error('error', 'OK');

loggerInfo.debug('debug', 'NG');
loggerWarn.info('warn', 'NG');
loggerError.info('error', 'NG', { 'no work': 'no work' });
