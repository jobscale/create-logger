import { jest } from '@jest/globals';
import { createLogger } from '../index.js';

describe('test @jobscale/create-logger in browser', () => {
  const timestamp = new Date().toLocaleString();
  const spy = {};

  beforeAll(() => {
    // Simulate browser environment where window.console exists
    if (typeof window === 'undefined') {
      global.window = global;
    }

    // Spy on original console methods before createLogger modifies them
    spy.consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
    spy.consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => { });
    spy.consoleInfo = jest.spyOn(console, 'info').mockImplementation(() => { });
    spy.consoleDebug = jest.spyOn(console, 'debug').mockImplementation(() => { });
    spy.consoleLog = jest.spyOn(console, 'log').mockImplementation(() => { });

    // Initialize logger which should hijack console
    createLogger();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('verify console hijacking', () => {
    it('should have replaced global console methods with no-op', () => {
      // In the implementation, native.fn points to the original console
      // and the global console methods are replaced with the 'native' function
      // checking if calling global console methods does NOT call the original spies
      // because they are now pointing to the internal 'native' no-op or similar wrapper

      // Actually, looking at index.js:
      // native.fn = console;
      // native.fn.error = native;
      // This means the global console.error IS replaced by 'native' function.
      // So calling console.error() should NOT call the original console.error (which we spied on).

      console.error('should be suppressed');
      expect(spy.consoleError).not.toHaveBeenCalled();

      console.warn('should be suppressed');
      expect(spy.consoleWarn).not.toHaveBeenCalled();

      console.info('should be suppressed');
      expect(spy.consoleInfo).not.toHaveBeenCalled();

      console.debug('should be suppressed');
      expect(spy.consoleDebug).not.toHaveBeenCalled();

      console.log('should be suppressed');
      expect(spy.consoleLog).not.toHaveBeenCalled();
    });
  });

  describe('verify logger instance calls original console', () => {
    it('should call original console.error via logger', () => {
      const logger = createLogger('error');
      logger.error('test error', { timestamp });
      expect(spy.consoleError).toHaveBeenCalledTimes(1);
    });

    it('should call original console.warn via logger', () => {
      const logger = createLogger('warn');
      logger.warn('test warn', { timestamp });
      expect(spy.consoleWarn).toHaveBeenCalledTimes(1);
    });

    it('should call original console.info via logger', () => {
      const logger = createLogger('info');
      logger.info('test info', { timestamp });
      expect(spy.consoleInfo).toHaveBeenCalledTimes(1);
    });

    it('should call original console.debug via logger', () => {
      const logger = createLogger('debug');
      logger.debug('test debug', { timestamp });
      expect(spy.consoleDebug).toHaveBeenCalledTimes(1);
    });

    it('should call original console.log via logger.verbose', () => {
      const logger = createLogger('verbose');
      logger.verbose('test verbose', { timestamp });
      expect(spy.consoleLog).toHaveBeenCalledTimes(1);
    });
  });
});
