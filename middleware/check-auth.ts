import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

const checkAuth = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const jwtKey = process.env.JWT_KEY || '';
    const decodedToken: any = jwt.verify(token, jwtKey);
    req.userData = {
      username: decodedToken.username,
      userId: decodedToken.userId
    };
    next();
  } catch (error) {
    let statusCode = 401;
    if (error.name === 'JsonWebTokenError') {
      statusCode = 403;
    }
    res.status(statusCode).json({ message: 'You are not authenticated' });
  }
};

export default checkAuth;
