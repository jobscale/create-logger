import { jest } from '@jest/globals';
import { createLogger } from '../index.js';

describe('test @jobscale/create-logger', () => {
  const timestamp = new Date().toLocaleString();
  const spy = {};

  beforeAll(() => {
    createLogger();
  });

  beforeEach(() => {
    spy.error = jest.spyOn(createLogger, 'error').mockImplementation(() => { });
    spy.warn = jest.spyOn(createLogger, 'warn').mockImplementation(() => { });
    spy.info = jest.spyOn(createLogger, 'info').mockImplementation(() => { });
    spy.debug = jest.spyOn(createLogger, 'debug').mockImplementation(() => { });
    spy.verbose = jest.spyOn(createLogger, 'verbose').mockImplementation(() => { });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('test logLevel error', () => {
    it('should call createLogger.error', () => {
      const logger = createLogger('error');
      logger.error('OK', { timestamp });
      expect(spy.error).toHaveBeenCalledTimes(1);
    });

    it('should not call createLogger.warn', () => {
      const logger = createLogger('error');
      logger.warn('NG', { timestamp });
      expect(spy.warn).not.toHaveBeenCalled();
    });

    it('should not call createLogger.info', () => {
      const logger = createLogger('error');
      logger.info('NG', { timestamp });
      expect(spy.info).not.toHaveBeenCalled();
    });

    it('should not call createLogger.debug', () => {
      const logger = createLogger('error');
      logger.debug('NG', { timestamp });
      expect(spy.debug).not.toHaveBeenCalled();
    });

    it('should not call createLogger.verbose', () => {
      const logger = createLogger('error');
      logger.verbose('NG', { timestamp });
      expect(spy.verbose).not.toHaveBeenCalled();
    });
  });

  describe('test logLevel warn', () => {
    it('should call createLogger.error', () => {
      const logger = createLogger('warn');
      logger.error('OK', { timestamp });
      expect(spy.error).toHaveBeenCalledTimes(1);
    });

    it('should call createLogger.warn', () => {
      const logger = createLogger('warn');
      logger.warn('OK', { timestamp });
      expect(spy.warn).toHaveBeenCalledTimes(1);
    });

    it('should not call createLogger.info', () => {
      const logger = createLogger('warn');
      logger.info('NG', { timestamp });
      expect(spy.info).not.toHaveBeenCalled();
    });

    it('should not call createLogger.debug', () => {
      const logger = createLogger('warn');
      logger.debug('NG', { timestamp });
      expect(spy.debug).not.toHaveBeenCalled();
    });

    it('should not call createLogger.verbose', () => {
      const logger = createLogger('warn');
      logger.verbose('NG', { timestamp });
      expect(spy.verbose).not.toHaveBeenCalled();
    });
  });

  describe('test logLevel info', () => {
    it('should call createLogger.error', () => {
      const logger = createLogger('info');
      logger.error('OK', { timestamp });
      expect(spy.error).toHaveBeenCalledTimes(1);
    });

    it('should call createLogger.warn', () => {
      const logger = createLogger('info');
      logger.warn('OK', { timestamp });
      expect(spy.warn).toHaveBeenCalledTimes(1);
    });

    it('should call createLogger.info', () => {
      const logger = createLogger('info');
      logger.info('OK', { timestamp });
      expect(spy.info).toHaveBeenCalledTimes(1);
    });

    it('should not call createLogger.debug', () => {
      const logger = createLogger('info');
      logger.debug('NG', { timestamp });
      expect(spy.debug).not.toHaveBeenCalled();
    });

    it('should not call createLogger.verbose', () => {
      const logger = createLogger('info');
      logger.verbose('NG', { timestamp });
      expect(spy.verbose).not.toHaveBeenCalled();
    });
  });

  describe('test logLevel debug', () => {
    it('should call createLogger.error', () => {
      const logger = createLogger('debug');
      logger.error('OK', { timestamp });
      expect(spy.error).toHaveBeenCalledTimes(1);
    });

    it('should call createLogger.warn', () => {
      const logger = createLogger('debug');
      logger.warn('OK', { timestamp });
      expect(spy.warn).toHaveBeenCalledTimes(1);
    });

    it('should call createLogger.info', () => {
      const logger = createLogger('debug');
      logger.info('OK', { timestamp });
      expect(spy.info).toHaveBeenCalledTimes(1);
    });

    it('should call createLogger.debug', () => {
      const logger = createLogger('debug');
      logger.debug('OK', { timestamp });
      expect(spy.debug).toHaveBeenCalledTimes(1);
    });

    it('should not call createLogger.verbose', () => {
      const logger = createLogger('debug');
      logger.verbose('NG', { timestamp });
      expect(spy.verbose).not.toHaveBeenCalled();
    });
  });

  describe('test logLevel verbose', () => {
    it('should call createLogger.error', () => {
      const logger = createLogger('verbose');
      logger.error('OK', { timestamp });
      expect(spy.error).toHaveBeenCalledTimes(1);
    });

    it('should call createLogger.warn', () => {
      const logger = createLogger('verbose');
      logger.warn('OK', { timestamp });
      expect(spy.warn).toHaveBeenCalledTimes(1);
    });

    it('should call createLogger.info', () => {
      const logger = createLogger('verbose');
      logger.info('OK', { timestamp });
      expect(spy.info).toHaveBeenCalledTimes(1);
    });

    it('should call createLogger.debug', () => {
      const logger = createLogger('verbose');
      logger.debug('OK', { timestamp });
      expect(spy.debug).toHaveBeenCalledTimes(1);
    });

    it('should call createLogger.verbose', () => {
      const logger = createLogger('verbose');
      logger.verbose('OK', { timestamp });
      expect(spy.verbose).toHaveBeenCalledTimes(1);
    });
  });

  describe('test default logLevel (info)', () => {
    it('should call createLogger.error', () => {
      const logger = createLogger();
      logger.error('OK', { timestamp });
      expect(spy.error).toHaveBeenCalledTimes(1);
    });

    it('should call createLogger.warn', () => {
      const logger = createLogger();
      logger.warn('OK', { timestamp });
      expect(spy.warn).toHaveBeenCalledTimes(1);
    });

    it('should call createLogger.info', () => {
      const logger = createLogger();
      logger.info('OK', { timestamp });
      expect(spy.info).toHaveBeenCalledTimes(1);
    });

    it('should not call createLogger.debug', () => {
      const logger = createLogger();
      logger.debug('NG', { timestamp });
      expect(spy.debug).not.toHaveBeenCalled();
    });

    it('should not call createLogger.verbose', () => {
      const logger = createLogger();
      logger.verbose('NG', { timestamp });
      expect(spy.verbose).not.toHaveBeenCalled();
    });
  });
});
