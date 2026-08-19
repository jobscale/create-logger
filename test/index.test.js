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
});
