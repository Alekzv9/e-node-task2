import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8000;

// Middlewares
app.use(bodyParser.json());

// Routes
const userRoutes = require('./controllers/user.controller');

app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log('Server started.');
});
