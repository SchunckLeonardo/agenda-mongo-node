let User = require("../Models/UserModel")

class LoginController {

    indexPage(req, res) {
        if(req.session.user) {
            res.redirect("/")
        } else {
            res.render("login")
        }
    }

    async register(req, res) {

        let { emailRegister, passwordRegister } = req.body

        try {
            await User.create(emailRegister, passwordRegister)

            if (User.errors.length > 0) {
                req.flash("errors", User.errors)
                req.session.save(() => res.redirect("/login"))
                return
            }
            req.flash("success", "Your account was created!")
            req.session.save(() => res.redirect("/login"))
        } catch (err) {
            console.log(err)
        }
    }

    async login(req, res) {
        let { emailLogin, passwordLogin } = req.body

        try {
            await User.auth(emailLogin, passwordLogin)

            if (User.errors.length > 0) {
                req.flash("errors", User.errors)
                req.session.save(() => res.redirect("/login"))
                return
            }
            req.flash("success", "You are logged in!")
            req.session.user = User.user
            req.session.save(() => res.redirect("/login"))
        } catch (err) {
            console.log(err)
        }
    }

    async logout(req, res) {
        req.session.destroy(() => {
            res.redirect("/login")
        })
    }

}

module.exports = new LoginController()