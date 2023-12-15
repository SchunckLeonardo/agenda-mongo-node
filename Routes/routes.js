const express = require("express")
const route = express.Router()
let HomeController = require("../src/Controllers/homeController")
let LoginController = require("../src/Controllers/loginController")

route.get("/", HomeController.indexPage)
route.get("/login", LoginController.indexPage)

module.exports = route