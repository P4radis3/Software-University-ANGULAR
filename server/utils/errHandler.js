function errorHandler(err, req, res, next) {
    if (err.status === 405) {
        res.status(405)
            .json({ message: 'Try again, but with a different approach!' })
    } else {
        res.status(500)
            .json({ message: 'There was a rat in my basement! Sorry... trying to kill it.', err })
    }
}

module.exports = errorHandler;
