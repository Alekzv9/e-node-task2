import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Middlewares
app.use(bodyParser.json());

// Routes
const userRoutes = require('./controllers/user.controller');

app.use('/user', userRoutes);

app.listen(8000, () => {
  console.log('Server started.');
});