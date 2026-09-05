# @jobscale/create-logger

## Description

***log level and priority***

|level|priority|color|default|
|:-:|:-:|:-:|:-:|
|error|0|red||
|warn|1|yellow||
|info|2|white|✓|
|debug|3|white||
|verbose|4|white||

## Installation

```
npm i @jobscale/create-logger
```

## Examples

### Nodejs (ES Module)

```javascript
import { createLogger } from '@jobscale/create-logger';

const logger = createLogger('info');
logger.error('error', { timestamp: Date.now() });
logger.warn('warn', { timestamp: Date.now() });
logger.info('info', { timestamp: Date.now() });
logger.debug('debug', { timestamp: Date.now() });
logger.verbose('verbose', { timestamp: Date.now() });
```

### Browser (type="module")

```js
import { createLogger, logger } from 'https://esm.sh/@jobscale/create-logger';

const myLogger = createLogger('verbose');
logger.error('error', { timestamp: Date.now() });
logger.warn('warn', { timestamp: Date.now() });
logger.info('info', { timestamp: Date.now() });
logger.debug('debug', { timestamp: Date.now() });
myLogger.verbose('verbose', { timestamp: Date.now() });
```

### Nodejs type="commonjs"

```js
const pending = import('@jobscale/create-logger');

const main = async () => {
  const { logger } = await pending;
  logger.info('info', { timestamp: Date.now() });
  logger.debug('debug', { timestamp: Date.now() });
};
main();
```

### Browser type="commonjs" classic style

```js
const pending = import('https://esm.sh/@jobscale/create-logger');

const main = async () => {
  const { logger } = await pending;
  logger.info('info', { timestamp: Date.now() });
  logger.debug('debug', { timestamp: Date.now() });
};
main();
```

### test

```bash
npm test
```
