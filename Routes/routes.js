const express = require("express")
let Middlewares = require("../src/Middlewares/middleware")
const route = express.Router()
let HomeController = require("../src/Controllers/homeController")
let LoginController = require("../src/Controllers/loginController")
let ContatoController = require("../src/Controllers/contatoController")

route.get("/", HomeController.indexPage)
route.get("/login", LoginController.indexPage)
route.post("/register", LoginController.register)
route.post("/login", LoginController.login)
route.get("/logout", LoginController.logout)
route.get("/contato", Middlewares.checkLogged, ContatoController.indexPage)
route.post("/contato", Middlewares.checkLogged, ContatoController.saveContact)
route.get("/contato/:id", Middlewares.checkLogged, ContatoController.editContact)
route.post("/contato/:id", Middlewares.checkLogged, ContatoController.editAndSave)
route.get("/contato/delete/:id", Middlewares.checkLogged, ContatoController.deleteContact)

module.exports = route