const express = require("express")
const path = require("path")
const Router = require("./Routes/routes")
const mongoose = require("mongoose")
const flash = require("connect-flash")
const helmet = require("helmet")
const csrf = require("csurf")
const Middleware = require('./src/Middlewares/middleware')
const session = require("express-session")
const MongoStore = require("connect-mongo")
const app = express()
require("dotenv").config()

// Configurando o helmet
app.use(helmet())

// Configuração do Session
app.use(session({
    secret: "sjdianfiawofiawn",
    store: MongoStore.create({ mongoUrl: process.env.URLDATABASE }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60,
    }
}))
app.use(flash())

// Conectar o banco de dados
mongoose.connect(process.env.URLDATABASE).then(() => {
    app.emit("database")
}).catch(err => console.log(err))

// Configurar os arquivos estáticos
app.use(express.static(path.resolve(__dirname, "public")))

// Configurar o Views
app.set("views", path.resolve(__dirname, "src", "Views"))
app.set("view engine", "ejs")

// Configurar o Body Parser
app.use(express.urlencoded({ extended: false }))

// Configurando o CSRF
app.use(csrf())

// Middlewares Globais
app.use(Middleware.checkCSRFErr)
app.use(Middleware.csrfMiddleware)
app.use(Middleware.global)

// Configurar as Rotas
app.use(Router)

app.on("database", () => {
    app.listen(8080, () => {
        console.log("Server started...")
    })
})