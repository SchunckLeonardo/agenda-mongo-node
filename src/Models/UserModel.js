const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")

let UserSchema = new mongoose.Schema({
    email: String,
    password: String
})

let UserModel = mongoose.model("users", UserSchema)

class User {
    constructor() {
        this.errors = []
        this.user = null
    }

    async create(email, password) {

        try {

            this.errors = []

            await this.validate(email, password)

            if (this.errors.length > 0) return

            await this.UserExists(email)

            if (this.errors.length > 0) return

            let hash = await bcrypt.hash(password, 10)

            await UserModel.create({ email, password: hash })

        } catch (err) {
            console.log(err)
        }

    }

    async auth(email, password) {

        try {

            this.errors = []

            await this.validate(email, password)

            let user = await UserModel.findOne({ email })

            if(!user) {
                this.errors.push("Email not found!")
                this.user = null
                return
            }

            if(!bcrypt.compareSync(password, user.password)) {
                this.errors.push("Incorrect password")
                this.user = null
                return
            }

            this.user = user

        } catch(err) {
            console.log(err)
        }

    }

    async UserExists(email) {

        try {
            let user = await UserModel.findOne({ email })
            if (user) this.errors.push("This Email has been registered")
        } catch (err) {
            console.log(err)
        }

    }

    async validate(email, password) {

        if (!validator.isEmail(email)) this.errors.push("Invalid E-mail")
        if (password.length < 3) this.errors.push("Password must be greater than 3!")

    }

}

module.exports = new User()