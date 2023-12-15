const mongoose = require("mongoose")
const validator = require("validator")

let ContatoSchema = new mongoose.Schema({
    name: String,
    subname: String,
    email: String,
    phone: String,
    createdAt: { type: Date, default: Date.now() }
})

let ContatoModel = mongoose.model("contacts", ContatoSchema)

class Contato {
    constructor() {
        this.errors = []
    }

    async saveContact(name, subname, email, phone) {

        this.errors = []

        this.valid(name, subname, email, phone)

        if (this.errors.length > 0) return

        await ContatoModel.create({ name, subname, email, phone })

    }

    valid(name, subname, email, phone) {
        if (name == "" || subname == "" || email == "" || phone == "") this.errors.push("Fields can't be empty")
        if (!validator.isEmail(email)) this.errors.push("Invalid Email")

    }

    async getAll() {
        try {

            let contacts = await ContatoModel.find()
            return contacts

        } catch(err) {
            console.log(err)
        }
    }

    async findById(id) {
        try {
            const user = await ContatoModel.findById(id)
            return user
        } catch(err) {
            console.log(err)
        }
    }

}

module.exports = new Contato()