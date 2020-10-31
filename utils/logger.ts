import winston from 'winston';

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
  }
};

const formatter = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss' }),
  winston.format.splat(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;

    return `[${timestamp}][${level}]: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
    }`;
  })
);

const consoleTransport = new winston.transports.Console({
  format: formatter
});

const logger = winston.createLogger({
  level: 'info',
  levels: customLevels.levels,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: formatter
    }),
    new winston.transports.File({
      filename: './logs/combined.log',
      format: formatter
    }),
    consoleTransport
  ]
});

const serviceLogger = (serviceName: string, args?: any) => {
  let stringArgs = 'No arguments';
  if (args) {
    stringArgs = `Arguments ${JSON.stringify(args)}`;
  }
  logger.log('info', `Service: ${serviceName} - ${stringArgs}}`);
};

const controllerLogger = (controllerName: string, args?: any) => {
  let stringArgs = 'No arguments';
  if (args) {
    stringArgs = `Arguments ${JSON.stringify(args)}`;
  }
  logger.log('error', `Controller method: ${controllerName} - ${stringArgs}}`);
};

export { logger, serviceLogger, controllerLogger };
