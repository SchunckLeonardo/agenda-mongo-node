let User = require("../Models/UserModel")

class LoginController {

    indexPage(req, res) {
        res.render("login")
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

}

module.exports = new LoginController()