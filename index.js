const { ...Logger } = console;
const logLevel = ['fail', 'error', 'warn', 'info', 'debug', 'verbose'];
Logger.verbose = Logger.log;
Logger.debug = Logger.verbose;
if (!Logger.info) Logger.info = Logger.debug;
if (!Logger.warn) Logger.warn = Logger.info;
if (!Logger.error) Logger.error = Logger.warn;
if (!Logger.fail) Logger.fail = Logger.error;

export const createLogger = (lv = { level: 'debug' }, opts = {}) => {
  if (typeof lv === 'object') opts = lv;
  else opts.level = lv;
  const {
    level = 'debug',
    callback = undefined,
    timestamp = undefined,
    typed = undefined,
  } = opts;
  return new Proxy(Logger, {
    get(target, prop) {
      const useLevel = logLevel.indexOf(level);
      if (useLevel < logLevel.indexOf(prop)) return () => undefined;
      if (!logLevel.includes(prop)) return target[prop];
      const custom = callback || timestamp || typed;
      if (!custom) return target[prop];
      return (...args) => {
        callback?.(...args);
        if (typed) args.unshift(`[${prop.toUpperCase()}]`);
        if (timestamp) args.unshift(new Date().toISOString());
        target[prop](...args);
      };
    },
  });
};

export const logger = createLogger('verbose');
export default createLogger;
