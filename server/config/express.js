const express = require('express');
const path = require('path');
const parser = require('cookie-parser');
const secret = process.env.COOKIESECRET || 'secret';

module.exports = (app) => {

    app.use(express.json());
    app.use(parser(secret));
    app.use(express.static(path.resolve(__basedir, 'static')));

};
