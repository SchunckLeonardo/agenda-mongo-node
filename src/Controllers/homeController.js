class HomeController {

    async homePage(req, res) {
        res.render("index", {title: "Olá"})
    }

    async sendData(req, res) {
        let { title, description } = req.body

        res.redirect("/home")

    }

}

module.exports = new HomeController()