/* eslint-disable jest/expect-expect, no-console */
import { jest } from '@jest/globals';

describe('test @jobscale/create-logger', () => {
  let createLogger;
  let originalConsole;
  let mockedConsole;
  let mockedCallback;

  const callAllLevels = logger => {
    logger.error('error');
    logger.warn('warn');
    logger.info('info');
    logger.debug('debug');
    logger.verbose('verbose');
  };

  const expectCallbackCalls = expected => {
    expect(mockedCallback).toHaveBeenCalledTimes(expected);
  };

  beforeEach(async () => {
    originalConsole = {
      error: console.error,
      warn: console.warn,
      info: console.info,
      log: console.log,
    };

    mockedConsole = {
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
      log: jest.fn(),
    };
    mockedCallback = jest.fn();

    console.error = mockedConsole.error;
    console.warn = mockedConsole.warn;
    console.info = mockedConsole.info;
    console.log = mockedConsole.log;

    jest.resetModules();
    ({ createLogger } = await import('../index.js'));
  });

  afterEach(() => {
    console.error = originalConsole.error;
    console.warn = originalConsole.warn;
    console.info = originalConsole.info;
    console.log = originalConsole.log;
    jest.restoreAllMocks();
  });

  it('logLevel error: only error is enabled', () => {
    callAllLevels(createLogger('error', { callback: mockedCallback }));
    expectCallbackCalls(1);
  });

  it('logLevel warn: error and warn are enabled', () => {
    callAllLevels(createLogger('warn', { callback: mockedCallback }));
    expectCallbackCalls(2);
  });

  it('logLevel info: error, warn, info are enabled', () => {
    callAllLevels(createLogger('info', { callback: mockedCallback }));
    expectCallbackCalls(3);
  });

  it('logLevel debug: up to debug is enabled', () => {
    callAllLevels(createLogger('debug', { callback: mockedCallback }));
    expectCallbackCalls(4);
  });

  it('logLevel verbose: all levels are enabled', () => {
    callAllLevels(createLogger('verbose', { callback: mockedCallback }));
    expectCallbackCalls(5);
  });

  it('default logLevel is debug', () => {
    callAllLevels(createLogger(undefined, { callback: mockedCallback }));
    expectCallbackCalls(4);
  });

  it('invalid logLevel disables all standard methods', async () => {
    const { createLogger: create } = await import('../index.js');
    callAllLevels(create('bogus', { callback: mockedCallback }));
    expectCallbackCalls(0);
  });

  it('named logger export uses default info level', async () => {
    const { logger } = await import('../index.js');
    callAllLevels(logger);
    expect(mockedConsole.error).toHaveBeenCalledTimes(1);
    expect(mockedConsole.warn).toHaveBeenCalledTimes(1);
    expect(mockedConsole.info).toHaveBeenCalledTimes(1);
    expect(mockedConsole.log).toHaveBeenCalledTimes(2);
  });

  it('default export is the createLogger function', async () => {
    const mod = await import('../index.js');
    expect(mod.default).toBe(mod.createLogger);
  });

  it('passes arguments through to console methods', () => {
    const logger = createLogger('verbose', { callback: mockedCallback });
    logger.error('e1', 'e2', { a: 1 });
    logger.warn('w1');
    logger.info('i1', 'i2');
    logger.debug('d1');
    logger.verbose('v1', 42);
    expect(mockedCallback).toHaveBeenNthCalledWith(1, 'e1', 'e2', { a: 1 });
    expect(mockedCallback).toHaveBeenNthCalledWith(2, 'w1');
    expect(mockedCallback).toHaveBeenNthCalledWith(3, 'i1', 'i2');
    expect(mockedCallback).toHaveBeenNthCalledWith(4, 'd1');
    expect(mockedCallback).toHaveBeenNthCalledWith(5, 'v1', 42);
  });

  it('routes debug and verbose output to console.log', () => {
    const logger = createLogger('verbose');
    logger.debug('d1');
    logger.verbose('v1', 42);
    expect(mockedConsole.log).toHaveBeenNthCalledWith(1, 'd1');
    expect(mockedConsole.log).toHaveBeenNthCalledWith(2, 'v1', 42);
  });

  it('non-level console methods pass through regardless of level', async () => {
    const tableSpy = jest.fn();
    const groupSpy = jest.fn();
    const traceSpy = jest.fn();
    console.table = tableSpy;
    console.group = groupSpy;
    console.trace = traceSpy;
    jest.resetModules();
    const { createLogger: create } = await import('../index.js');
    const logger = create('error');
    logger.table([{ a: 1 }]);
    logger.group('g');
    logger.trace('t');
    expect(tableSpy).toHaveBeenCalledWith([{ a: 1 }]);
    expect(groupSpy).toHaveBeenCalledWith('g');
    expect(traceSpy).toHaveBeenCalledWith('t');
  });
});
