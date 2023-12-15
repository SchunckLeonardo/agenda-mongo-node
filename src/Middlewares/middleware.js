class Middleware {

    checkCSRFErr(err, req, res, next) {
        if(err && err.code == "EBADCSRFTOKEN") {
            return res.render("404")
        }
    }

    csrfMiddleware(req, res, next) {
        res.locals.csrfToken = req.csrfToken()
        next()
    }

}

module.exports = new Middleware()