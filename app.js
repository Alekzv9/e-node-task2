const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middlewares
app.use(bodyParser.json());

// Routes
const userRoutes = require('./routes/user');

app.use('/user', userRoutes);

app.listen(8000);
