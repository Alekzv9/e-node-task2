import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import errorHandler from './utils/error';
import userRoutes from './controllers/user.controller';
import groupRoutes from './controllers/group.controller';

const app = express();
const PORT = 8000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/group', groupRoutes);

app.use((error: any, req: Request, res: Response, _: NextFunction) => {
  errorHandler(error, res);
});

app.listen(PORT, () => {
  console.log('Server started.');
});
