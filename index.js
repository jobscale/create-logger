const { ...Logger } = console;
const logLevel = ['error', 'warn', 'info', 'debug', 'verbose'];
if (!Logger.error) Logger.error = Logger.log;
if (!Logger.warn) Logger.warn = Logger.log;
if (!Logger.info) Logger.info = Logger.log;
if (!Logger.debug) Logger.debug = Logger.log;
if (!Logger.verbose) Logger.verbose = Logger.log;
export const createLogger = (level = 'debug', {
  callback,
  timestamp,
} = {}) => new Proxy(Logger, {
  get(target, prop) {
    const useLevel = logLevel.indexOf(level);
    if (useLevel < logLevel.indexOf(prop)) return () => undefined;
    const custom = callback || timestamp;
    if (!custom) return target[prop];
    return (...args) => {
      callback?.(...args);
      if (timestamp) args.unshift(new Date().toISOString());
      target[prop](...args);
    };
  },
});
export const logger = createLogger('debug');
export default createLogger;
