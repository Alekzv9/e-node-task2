const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middlewares
app.use(bodyParser.json());

// Routes
const userRoutes = require('./controllers/user.controller');
const groupRoutes = require('./controllers/group.controller');

app.use('/user', userRoutes);
app.use('/group', groupRoutes);

app.listen(8000, () => {
  console.log('Server running');
});
