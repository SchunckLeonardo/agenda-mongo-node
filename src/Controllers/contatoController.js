let Contato = require("../Models/ContatoModel")

class ContatoController {

    indexPage(req, res) {
        if (req.session.user) {
            res.render("contato", { contato: {} })
        } else {
            res.redirect("/login")
        }
    }

    async saveContact(req, res) {

        let { name, subname, email, phone } = req.body

        try {
            await Contato.saveContact(name, subname, email, phone)
            if (Contato.errors.length > 0) {
                req.flash("errors", Contato.errors)
                req.session.save(() => res.redirect("/contato"))
                return
            }
            req.flash("success", "Contact saved")
            req.session.save(() => res.redirect("/contato"))
        } catch (err) {
            console.log(err)
        }
    }

    async editContact(req, res) {
        if (!req.params.id) res.render("404")

        const contato = await Contato.findById(req.params.id)

        if (!contato) res.render("404")

        res.render("contato", { contato })

    }

}

module.exports = new ContatoController()