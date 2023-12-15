const express = require("express")
const route = express.Router()
const HomeController = require("../src/Controllers/homeController")

route.get("/home", HomeController.homePage)
route.post("/", HomeController.sendData)

module.exports = route