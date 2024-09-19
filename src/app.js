import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import MongoStore from 'connect-mongo';

const app = express();

const PORT = 8080

// Configuración de Handlebars para renderizar vistas
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://climon:psswrd24TECTOS@cluster0.nf6kn.mongodb.net/' }),
    // cookie: { maxAge: 180 * 60 * 1000 },
}));

app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});