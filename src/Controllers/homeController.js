class HomeController {

    indexPage(req, res) {
        res.render("index")
    }

}

module.exports = new HomeController()