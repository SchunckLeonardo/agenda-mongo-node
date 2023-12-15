class Middleware {

    global(req, res, next) {
        res.locals.errors = req.flash("errors")
        res.locals.success = req.flash("success")
        res.locals.user = req.session.user
        next()
    }

    checkLogged(req, res, next) {
        if(req.session.user) {
            next()
        } else {
            req.flash("errors", "You must be logged")
            req.session.save(() => res.redirect("/login"))
        }
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