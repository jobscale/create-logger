import createLogger from './index.js';

const logger = createLogger();
const loggerVerbose = createLogger('verbose');
const loggerDebug = createLogger('debug');
const loggerInfo = createLogger('info');
const loggerWarn = createLogger('warn');
const loggerError = createLogger('error');

logger.debug('default', 'OK');
loggerVerbose.info('verbose', 'OK');
loggerDebug.debug('debug', 'OK');
loggerInfo.info('info', 'OK');
loggerWarn.warn('warn', 'OK');
loggerError.error('error', 'OK');

loggerInfo.debug('debug', 'NG');
loggerWarn.info('warn', 'NG');
loggerError.info('error', 'NG');
