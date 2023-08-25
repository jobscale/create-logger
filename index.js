const createLogger = level => {
  const native = () => {};
  const LIST = [
    'error', 'warn', 'info', 'debug', 'log',
  ];
  /* eslint-disable no-console */
  const logger = {
    error: console.error,
    warn: console.warn,
    info: console.info,
    debug: console.debug,
    log: console.log,
    dir: console.dir,
    trace: console.trace,
  };
  /* eslint-enable no-console */
  const logLevel = LIST.indexOf(level || 'info');
  if (logLevel !== -1) {
    if (logLevel < LIST.indexOf('warn')) logger.warn = native;
    if (logLevel < LIST.indexOf('info')) logger.info = native;
    if (logLevel < LIST.indexOf('debug')) logger.debug = native;
    if (logLevel < LIST.indexOf('log')) {
      logger.log = native;
      logger.dir = native;
      logger.trace = native;
    }
  }
  return logger;
};

module.exports = {
  createLogger,
};
