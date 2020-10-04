import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8000;

// Middlewares
app.use(bodyParser.json());

// Routes
const userRoutes = require('./controllers/user.controller');
const groupRoutes = require('./controllers/group.controller');

app.use('/user', userRoutes);
app.use('/group', groupRoutes);

app.listen(PORT, () => {
  console.log('Server started.');
});
