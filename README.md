# @jobscale/create-logger

## Description

```js
createLogger(level: String, { typed: Any, timestamp: Any, callback: Function })
```

### Log Levels and priority

|level|priority|default|
|:-:|:-:|:-:|
|fail|0||
|error|1||
|warn|2||
|info|3||
|debug|4|✓|
|verbose|5||

### Options

* typed - shows the log level in the log message
* timestamp - shows the timestamp in the log message
* callback - calls a callback function with the log message

## Installation

```
npm i @jobscale/create-logger
```

## Examples

### Nodejs (ES Module)

```javascript
import { createLogger, logger } from '@jobscale/create-logger';

const myLogger = createLogger('info', { typed: true });

logger.error('error', { data: new Date() });
logger.warn('warn', { data: new Date() });
logger.info('info', { data: new Date() });
logger.debug('debug', { data: new Date() });
logger.verbose('verbose', { data: new Date() });
myLogger.verbose('verbose', { data: new Date() });
```

### Browser (type="module")

```js
import { createLogger, logger } from 'https://esm.sh/@jobscale/create-logger';

const myLogger = createLogger('verbose', { typed: true });

logger.error('error', { data: new Date() });
logger.warn('warn', { data: new Date() });
logger.info('info', { data: new Date() });
logger.debug('debug', { data: new Date() });
logger.verbose('verbose', { data: new Date() });
myLogger.verbose('verbose', { data: new Date() });
```

### Nodejs type="commonjs"

```js
const pending = import('@jobscale/create-logger');

const main = async () => {
  const { createLogger } = await pending;
  const logger = createLogger('debug', { typed: true });

  logger.info('info', { data: new Date() });
  logger.debug('debug', { data: new Date() });
};
main();
```

### Browser type="commonjs" classic style

```js
const pending = import('https://esm.sh/@jobscale/create-logger');

const main = async () => {
  const { createLogger } = await pending;
  const logger = createLogger('debug', { typed: true });

  logger.info('info', { data: new Date() });
  logger.debug('debug', { data: new Date() });
};
main();
```

## Tests

### smoke test

```bash
node smoke-test.js
```

### jest test

```bash
npm i
npm test
```
