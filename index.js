export const createLogger = level => {
  const native = () => {};
  const LIST = [
    'error', 'warn', 'info', 'debug', 'log',
  ];
  native.fn = console;
  const logger = {
    error: native.fn.error,
    warn: native.fn.warn,
    info: native.fn.info,
    debug: native.fn.debug,
    log: native.fn.log,
    dir: native.fn.dir,
    trace: native.fn.trace,
    time: native.fn.time,
    timeEnd: native.fn.timeEnd,
  };
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

createLogger.createLogger = createLogger;
export default createLogger;
