const { ...Logger } = console;
const logLevel = ['error', 'warn', 'info', 'debug', 'verbose'];
if (!Logger.error) Logger.error = Logger.log;
if (!Logger.warn) Logger.warn = Logger.log;
if (!Logger.info) Logger.info = Logger.log;
if (!Logger.debug) Logger.debug = Logger.log;
if (!Logger.verbose) Logger.verbose = Logger.log;
export const createLogger = (level = 'info') => new Proxy(Logger, {
  get(target, prop) {
    const useLevel = logLevel.indexOf(level);
    if (useLevel < logLevel.indexOf(prop)) return () => undefined;
    return target[prop];
  },
});
export const logger = createLogger();
export default createLogger;
