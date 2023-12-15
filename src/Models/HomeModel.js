const mongoose = require("mongoose")

let HomeSchema = new mongoose.Schema({
    title: String,
    description: String
})

let HomeModel = mongoose.model("homes", HomeSchema)

class Home {
    
}

module.exports = Home