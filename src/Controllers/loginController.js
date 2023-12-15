class LoginController {

    indexPage(req, res) {
        res.render("login")
    }

}

module.exports = new LoginController()