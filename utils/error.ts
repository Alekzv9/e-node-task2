import { Response } from 'express';
import { logger } from './logger';

const errorHandler = (err: any, res: Response) => {
  const { statusCode = 500, message = 'Unknown error' } = err;
  logger.log('error', message);
  return res.status(statusCode).json({
    status: 'error',
    message
  });
};

export default errorHandler;
