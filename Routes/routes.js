const express = require("express")
const route = express.Router()
let HomeController = require("../src/Controllers/homeController")
let LoginController = require("../src/Controllers/loginController")
let ContatoController = require("../src/Controllers/contatoController")

route.get("/", HomeController.indexPage)
route.get("/login", LoginController.indexPage)
route.post("/register", LoginController.register)
route.post("/login", LoginController.login)
route.get("/logout", LoginController.logout)
route.get("/contato", ContatoController.indexPage)
route.post("/contato", ContatoController.saveContact)
route.get("/contato/:id", ContatoController.editContact)

module.exports = route