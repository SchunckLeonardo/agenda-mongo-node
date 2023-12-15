class Middleware {

    global(req, res, next) {
        res.locals.errors = req.flash("errors")
        res.locals.success = req.flash("success")
        res.locals.user = req.session.user
        next()
    }

    checkCSRFErr(err, req, res, next) {
        if(err) {
            return res.render("404")
        }
    }

    csrfMiddleware(req, res, next) {
        res.locals.csrfToken = req.csrfToken()
        next()
    }

}

module.exports = new Middleware()