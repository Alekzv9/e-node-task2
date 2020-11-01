import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { serviceLogger } from '../utils/logger';
import CustomError from '../utils/CustomError';

exports.login = async (payload: any) => {
  const { login, password } = payload;
  serviceLogger('login', { login, password });
  const statusCode = 401;
  const errorMsg = 'Login or password incorrect';
  if (!login || !password) {
    throw new CustomError(errorMsg, statusCode);
  }

  const fetchedUser = (await User.findOne({
    where: { login, password }
  })) as any;

  if (fetchedUser) {
    const user = {
      username: fetchedUser.login,
      userId: fetchedUser.id
    };
    const jwtToken = process.env.JWT_KEY || '';
    const token = jwt.sign(user, jwtToken, {
      expiresIn: '30m'
    });

    return {
      userId: user.userId,
      token,
      expiresIn: 1800 // Seconds
    };
  } else {
    throw new CustomError(errorMsg, statusCode);
  }
};
