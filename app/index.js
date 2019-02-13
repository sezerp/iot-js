const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const deviceRouter = require('./api/device');
const accountRouter = require('./api/account');
const loginRouter = require('./api/login');
const registerRouter = require('./api/register');
const templateRouter = require('./api/template');

const app = express();
// 
app.use(cors({ origin: 'http://localhost:1234', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// 
app.use('/device', deviceRouter);
app.use('/account', accountRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/template', templateRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message);
    if (err.statusCode === 500 ) err.message = 'Internal server error.';
    res.status(statusCode).json({
      type: 'error', message: err.message
    })
  });

module.exports = app;