/* eslint-disable jest/expect-expect, no-console */
import { jest } from '@jest/globals';

describe('test @jobscale/create-logger', () => {
  let createLogger;
  let originalConsole;
  let mockedConsole;

  const callAllLevels = logger => {
    logger.error('error');
    logger.warn('warn');
    logger.info('info');
    logger.debug('debug');
    logger.verbose('verbose');
  };

  const expectCounts = expected => {
    expect(mockedConsole.error).toHaveBeenCalledTimes(expected.error);
    expect(mockedConsole.warn).toHaveBeenCalledTimes(expected.warn);
    expect(mockedConsole.info).toHaveBeenCalledTimes(expected.info);
    expect(mockedConsole.debug).toHaveBeenCalledTimes(expected.debug);
    expect(mockedConsole.verbose).toHaveBeenCalledTimes(expected.verbose);
  };

  beforeEach(async () => {
    originalConsole = {
      error: console.error,
      warn: console.warn,
      info: console.info,
      debug: console.debug,
      log: console.log,
      verbose: console.verbose,
    };

    mockedConsole = {
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
      debug: jest.fn(),
      log: jest.fn(),
      verbose: jest.fn(),
    };

    console.error = mockedConsole.error;
    console.warn = mockedConsole.warn;
    console.info = mockedConsole.info;
    console.debug = mockedConsole.debug;
    console.log = mockedConsole.log;
    console.verbose = mockedConsole.verbose;

    jest.resetModules();
    ({ createLogger } = await import('../index.js'));
  });

  afterEach(() => {
    console.error = originalConsole.error;
    console.warn = originalConsole.warn;
    console.info = originalConsole.info;
    console.debug = originalConsole.debug;
    console.log = originalConsole.log;
    console.verbose = originalConsole.verbose;
    jest.restoreAllMocks();
  });

  it('logLevel error: only error is enabled', () => {
    callAllLevels(createLogger('error'));
    expectCounts({ error: 1, warn: 0, info: 0, debug: 0, verbose: 0 });
  });

  it('logLevel warn: error and warn are enabled', () => {
    callAllLevels(createLogger('warn'));
    expectCounts({ error: 1, warn: 1, info: 0, debug: 0, verbose: 0 });
  });

  it('logLevel info: error, warn, info are enabled', () => {
    callAllLevels(createLogger('info'));
    expectCounts({ error: 1, warn: 1, info: 1, debug: 0, verbose: 0 });
  });

  it('logLevel debug: up to debug is enabled', () => {
    callAllLevels(createLogger('debug'));
    expectCounts({ error: 1, warn: 1, info: 1, debug: 1, verbose: 0 });
  });

  it('logLevel verbose: all levels are enabled', () => {
    callAllLevels(createLogger('verbose'));
    expectCounts({ error: 1, warn: 1, info: 1, debug: 1, verbose: 1 });
  });

  it('default logLevel is info', () => {
    callAllLevels(createLogger());
    expectCounts({ error: 1, warn: 1, info: 1, debug: 0, verbose: 0 });
  });

  it('invalid logLevel disables all standard methods', async () => {
    const { createLogger: create } = await import('../index.js');
    callAllLevels(create('bogus'));
    expectCounts({ error: 0, warn: 0, info: 0, debug: 0, verbose: 0 });
  });

  it('named logger export uses default info level', async () => {
    const { logger } = await import('../index.js');
    callAllLevels(logger);
    expectCounts({ error: 1, warn: 1, info: 1, debug: 0, verbose: 0 });
  });

  it('default export is the createLogger function', async () => {
    const mod = await import('../index.js');
    expect(mod.default).toBe(mod.createLogger);
  });

  it('passes arguments through to console methods', () => {
    const logger = createLogger('verbose');
    logger.error('e1', 'e2', { a: 1 });
    logger.warn('w1');
    logger.info('i1', 'i2');
    logger.debug('d1');
    logger.verbose('v1', 42);
    expect(mockedConsole.error).toHaveBeenCalledWith('e1', 'e2', { a: 1 });
    expect(mockedConsole.warn).toHaveBeenCalledWith('w1');
    expect(mockedConsole.info).toHaveBeenCalledWith('i1', 'i2');
    expect(mockedConsole.debug).toHaveBeenCalledWith('d1');
    expect(mockedConsole.verbose).toHaveBeenCalledWith('v1', 42);
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
