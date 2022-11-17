const express = require('express');
const userAuth = require('./middlewares/auth.middleware.js');
const errorHandler = require('./middlewares/errorHandler.middleware.js');

//Users.create({firstName: 'Armando', lastName: 'Fernandez', email: 'ikkimasie@gmail.com', password: '12488ksks'}).then();

const app = express();

app.use(express.json());

app.use('/api/v1', require('./routes/userRegister.route.js'));
app.use('/api/v1', require('./routes/login.route.js'));

app.use(userAuth);

app.use('/api/v1', require('./routes/usersCourses.route.js'));
app.use('/api/v1', require('./routes/users.route.js'));
app.use('/api/v1', require('./routes/categories.route.js'));
app.use('/api/v1', require('./routes/courses.route.js'));
app.use('/api/v1', require('./routes/videos.route.js'));

app.use(errorHandler);

module.exports = app;