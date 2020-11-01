import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import errorHandler from './utils/error';
import userRoutes from './controllers/user.controller';
import groupRoutes from './controllers/group.controller';
import authRoutes from './controllers/auth.controller';
import checkAuth from './middleware/check-auth';

const app = express();
const PORT = 8000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure headers.
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/auth', authRoutes);
app.use('/user', checkAuth, userRoutes);
app.use('/group', checkAuth, groupRoutes);

app.use((error: any, req: Request, res: Response, _: NextFunction) => {
  errorHandler(error, res);
});

app.listen(PORT, () => {
  console.log('Server started.');
});
