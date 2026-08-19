/* eslint-disable no-console */
import { jest } from '@jest/globals';

describe('test @jobscale/create-logger in browser', () => {
  let createLogger;
  let originalConsole;
  let mockedConsole;

  beforeEach(async () => {
    if (typeof window === 'undefined') {
      global.window = global;
    }

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

  it('does not replace global console methods', () => {
    const current = {
      error: console.error,
      warn: console.warn,
      info: console.info,
      debug: console.debug,
      log: console.log,
      verbose: console.verbose,
    };

    createLogger();

    expect(console.error).toBe(current.error);
    expect(console.warn).toBe(current.warn);
    expect(console.info).toBe(current.info);
    expect(console.debug).toBe(current.debug);
    expect(console.log).toBe(current.log);
    expect(console.verbose).toBe(current.verbose);
  });

  it('respects logLevel priority in browser-like environment', () => {
    const logger = createLogger('warn');
    logger.error('error');
    logger.warn('warn');
    logger.info('info');
    logger.debug('debug');
    logger.verbose('verbose');

    expect(mockedConsole.error).toHaveBeenCalledTimes(1);
    expect(mockedConsole.warn).toHaveBeenCalledTimes(1);
    expect(mockedConsole.info).not.toHaveBeenCalled();
    expect(mockedConsole.debug).not.toHaveBeenCalled();
    expect(mockedConsole.verbose).not.toHaveBeenCalled();
  });
});
