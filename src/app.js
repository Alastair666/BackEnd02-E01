import express from 'express';
import { create } from 'express-handlebars';
import passport from 'passport';
import initializePassport from './config/passport.config.js'
import cookieParser from 'cookie-parser';
import viewsRouter from "./routes/views.route.js"
import productsRouter from './routes/products.route.js'
import cartsRouter from "./routes/carts.route.js"
import usersRouter from "./routes/users.route.js"
import sessionsRouter from "./routes/sessions.route.js"
import __dirname, { ifEquals, inc } from "./utils.js"//Configuración Inicial
import dotenv from 'dotenv'

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: './src/settings.env' });
// Configurando Server
const app = express();
const PORT = process.env.PORT || 8080
//console.log(`JWT_SECRET: ${process.env.JWT_SECRET} \nPORT: ${process.env.PORT} \nMONGODB_URI: ${process.env.MONGODB_URI}`)

// Configurando Middlewares para endpoints
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Utilizar recursos estaticos
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())

// Configurar Handlebars para lectura de contenido de los endpoints
const hbs = create({
    runtimeOptions: {
        allowedProtoProperties: true,
        allowProtoMethodsByDefault: true
    },
    helpers: {
        ifEquals,
        inc
    }
});
app.engine('handlebars', hbs.engine)
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


// Enlazando rutas para endpoints
app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/users", usersRouter)
app.use("/api/sessions", sessionsRouter)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})