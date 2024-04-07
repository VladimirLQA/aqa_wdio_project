import { BaseLogger } from './abstract-logger.js';
import WinstonLogger from './winston-logger.js';

const loggerService: Record<string, BaseLogger> = {
  winston: WinstonLogger,
};

export default loggerService[process.env.LOGGER || 'winston'];
