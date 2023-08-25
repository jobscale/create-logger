const { createLogger } = require('..');

describe('test @jobscale/create-logger', () => {
  describe('test logLevel error', () => {
    const logger = createLogger('error');
    it('toBeUndefined prompt', () => {
      expect(logger.error('OK', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.warn('NG', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.info('NG', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.debug('NG', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.log('NG', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
  });

  describe('test logLevel warning', () => {
    const logger = createLogger('warning');
    it('toBeUndefined prompt', () => {
      expect(logger.error('OK', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.warn('OK', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.info('NG', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.debug('NG', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.log('NG', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
  });

  describe('test logLevel info', () => {
    const logger = createLogger('info');
    it('toBeUndefined prompt', () => {
      expect(logger.error('OK', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.warn('OK', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.info('OK', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.debug('NG', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.log('NG', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
  });

  describe('test logLevel debug', () => {
    const logger = createLogger('debug');
    it('toBeUndefined prompt', () => {
      expect(logger.error('OK', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.warn('OK', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.info('OK', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.debug('OK', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.log('NG', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
  });

  describe('test logLevel log', () => {
    const logger = createLogger('log');
    it('toBeUndefined prompt', () => {
      expect(logger.error('OK', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.warn('OK', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.info('OK', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.debug('OK', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
    it('toBeUndefined prompt', () => {
      expect(logger.log('OK', { timestamp: new Date().toLocaleString() })).toBeUndefined();
    });
  });
});
