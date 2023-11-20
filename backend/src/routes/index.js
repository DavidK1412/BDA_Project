const express = require('express');

const authRouter = require('./auth.router');

const routerApi = (app) => {
    app.use('/auth', authRouter);
}

module.exports = routerApi;