let Contato = require("../Models/ContatoModel")

class ContatoController {

    indexPage(req, res) {
        res.render("contato", { contato: {} })
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

    async editAndSave(req, res) {
        let id = req.params.id
        let { name, subname, email, phone } = req.body

        try {
            if (Contato.errors.length > 0) {
                req.flash("errors", Contato.errors)
                req.session.save(() => res.redirect(`/contato/${id}`))
                return
            }
            await Contato.edit(id, name, subname, email, phone)
            req.flash("success", "Contact updated")
            req.session.save(() => res.redirect(`/contato/${id}`))
        } catch (err) {
            console.log(err)
        }

    }

    async deleteContact(req, res) {
        if(!req.params.id) res.render("404")
        let id = req.params.id
        
        try {
            await Contato.delete(id)
            req.flash("success", "Contact Deleted")
            req.session.save(() => res.redirect(`/`))
        } catch(err) {
            console.log(err)
        }

    }

}

module.exports = new ContatoController()