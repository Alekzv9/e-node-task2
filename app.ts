import express from 'express';
import bodyParser from 'body-parser';
import errorHandler from './utils/error';
const userRoutes = require('./controllers/user.controller');
const groupRoutes = require('./controllers/group.controller');

const app = express();
const PORT = 8000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/group', groupRoutes);

app.use((error: any, req: any, res: any, next: any) => {
  errorHandler(error, res);
});

app.listen(PORT, () => {
  console.log('Server started.');
});
