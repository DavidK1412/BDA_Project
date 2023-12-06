const express = require('express');

const authRouter = require('./auth.router');
const cityRouter = require('./city.router');
const employeeRouter = require('./employee.router');
const clientRouter = require('./clients.router');
const brandRouter = require('./brand.router');
const colorRouter = require('./color.router');
const lineRouter = require('./line.router');
const autoRouter = require('./auto.router');
const saleRouter = require('./sale.router');
const branchRouter = require('./branch.router');
const specialRouter = require('./special.router');

const routerApi = (app) => {
    app.use('/auth', authRouter);
    app.use('/cities', cityRouter);
    app.use('/employees', employeeRouter);
    app.use('/clients', clientRouter);
    app.use('/brands', brandRouter);
    app.use('/colors', colorRouter);
    app.use('/lines', lineRouter);
    app.use('/autos', autoRouter);
    app.use('/sales', saleRouter);
    app.use('/branches', branchRouter);
    app.use('/special', specialRouter);
}

module.exports = routerApi;