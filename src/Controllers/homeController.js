let Contact = require("../Models/ContatoModel")

class HomeController {

    async indexPage(req, res) {
        let contacts = await Contact.getAll()
        res.render("index", {contacts})
    }

}

module.exports = new HomeController()