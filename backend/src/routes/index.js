const express = require('express');

const authRouter = require('./auth.router');
const cityRouter = require('./city.router');
const employeeRouter = require('./employee.router');

const routerApi = (app) => {
    app.use('/auth', authRouter);
    app.use('/cities', cityRouter);
    app.use('/employees', employeeRouter);
}

module.exports = routerApi;