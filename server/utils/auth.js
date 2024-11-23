const jwt = require('./jwt');
const { authCookieName } = require('../app-config');
const { userModel, tokenBlacklistModel } = require('../models');

function auth(redirectUnauthenticated = true) {

    return function (req, res, next) {
        const token = req.cookies[authCookieName] || '';
        Promise.all([jwt.verifyToken(token), tokenBlacklistModel.findOne({ token })])
            .then(([data, blacklistedToken]) => {
                if (blacklistedToken) { return Promise.reject(new Error('Seems like... your blacklisted!')); }
                userModel.findById(data.id)
                    .then(user => { req.user = user; req.isLogged = true; next(); })
            })
            .catch(err => {
                if (!redirectUnauthenticated) { next(); return; }
                if (['Your token is expired.', 'Token is blacklisted!', 'You must use JWT.'].includes(err.message)) {
                    res.status(401).send({ message: "Token is invalid!" });
                    return;
                }
                next(err);
            });
    }
}

module.exports = auth;
