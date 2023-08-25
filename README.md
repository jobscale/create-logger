# @jobscale/create-logger

## Description

***log level and priority***

|level|priority|color|default|
|:-:|:-:|:-:|:-:|
|error|0|red||
|warn|1|yellow||
|info|2|white|✓|
|debug|3|white||
|log|4|white||
|dir|4|white||
|trace|4|white||

## Installation

```
npm i @jobscale/create-logger
```

## Examples

### logging

```javascript
const { createLogger } = require('@jobscale/create-logger');

const logger = createLogger('info);
logger.error('error', { timestamp: Date.now() });
logger.warn('warn', { timestamp: Date.now() });
logger.info('info', { timestamp: Date.now() });
logger.debug('debug', { timestamp: Date.now() });
logger.log('log', { timestamp: Date.now() });
```

### logging (ES)

```c++
import { createLogger } from '@jobscale/create-logger';

const logger = createLogger('info);
logger.error('error', { timestamp: Date.now() });
logger.warn('warn', { timestamp: Date.now() });
logger.info('info', { timestamp: Date.now() });
logger.debug('debug', { timestamp: Date.now() });
logger.log('log', { timestamp: Date.now() });
```

### test

```javascript
npm test
```
