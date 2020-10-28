import express from 'express';
import bodyParser from 'body-parser';
const userRoutes = require('./controllers/user.controller');
const groupRoutes = require('./controllers/group.controller');

const app = express();
const PORT = 8000;

// Middlewares
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/group', groupRoutes);

app.listen(PORT, () => {
  console.log('Server started.');
});
