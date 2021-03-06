﻿require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// prefix all API routes with "/api" for future use
app.use('/api/users', require('./users/users.controller'));
app.use('/api/tasks', require('./tasks/tasks.controller'));
app.use('/api/activities', require('./activities/activity.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 8081) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port : ' + port);
});