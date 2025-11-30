const native = () => {};
const initCache = cache => {
  if (!native.fn) {
    native.fn = console;
    // assign native
    Object.assign(cache, {
      error: native.fn.error,
      warn: native.fn.warn,
      info: native.fn.info,
      debug: native.fn.debug,
      verbose: native.fn.log,
      trace: native.fn.trace,
      dir: native.fn.dir,
      table: native.fn.table,
      time: native.fn.time,
      timeEnd: native.fn.timeEnd,
      timeLog: native.fn.timeLog,
      group: native.fn.group,
      groupCollapsed: native.fn.groupCollapsed,
      groupEnd: native.fn.groupEnd,
      count: native.fn.count,
      countReset: native.fn.countReset,
      clear: native.fn.clear,
    });
    // disable native
    native.fn.error = native;
    native.fn.warn = native;
    native.fn.info = native;
    native.fn.debug = native;
    native.fn.log = native;
    native.fn.trace = native;
    native.fn.dir = native;
    native.fn.table = native;
    native.fn.time = native;
    native.fn.timeEnd = native;
    native.fn.timeLog = native;
    native.fn.group = native;
    native.fn.groupCollapsed = native;
    native.fn.groupEnd = native;
    native.fn.count = native;
    native.fn.countReset = native;
    native.fn.clear = native;
  }
};

/**
 * create logger
 * @param {String} level error | warn | info | debug | verbose
 * @returns logger instance
 */
export const createLogger = (level = 'info') => {
  initCache(createLogger);
  const LOG_LIST = [
    'error', 'warn', 'info', 'debug', 'verbose',
  ];
  // create logger
  const logger = {
    error: createLogger.error,
    warn: createLogger.warn,
    info: createLogger.info,
    debug: createLogger.debug,
    verbose: createLogger.verbose,
    trace: createLogger.trace,
    dir: createLogger.dir,
    table: createLogger.table,
    time: createLogger.time,
    timeEnd: createLogger.timeEnd,
    timeLog: createLogger.timeLog,
    group: createLogger.group,
    groupCollapsed: createLogger.groupCollapsed,
    groupEnd: createLogger.groupEnd,
    count: createLogger.count,
    countReset: createLogger.countReset,
    clear: createLogger.clear,
  };
  // setup logging level
  const logLevel = LOG_LIST.indexOf(level.toLowerCase());
  if (logLevel !== -1) {
    if (logLevel < LOG_LIST.indexOf('warn')) logger.warn = native;
    if (logLevel < LOG_LIST.indexOf('info')) logger.info = native;
    if (logLevel < LOG_LIST.indexOf('debug')) logger.debug = native;
    if (logLevel < LOG_LIST.indexOf('verbose')) {
      logger.verbose = native;
      logger.trace = native;
      logger.dir = native;
      logger.table = native;
      logger.time = native;
      logger.timeEnd = native;
      logger.timeLog = native;
      logger.group = native;
      logger.groupCollapsed = native;
      logger.groupEnd = native;
      logger.count = native;
      logger.countReset = native;
      logger.clear = native;
    }
  }
  return logger;
};

createLogger.createLogger = createLogger;
export default createLogger;
