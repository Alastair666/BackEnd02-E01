import passport from "passport";
import local from 'passport-local';
import userService from '../models/user.model.js'
import jwt from "passport-jwt"
import { createHash, isValidPassword } from '../middleware/auth.js'

// Cargar variables de entorno
const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

// Función que extrae a cookie del encabezado de la petición
const cookieExtractor = (req)=>{
    let token = null
    console.log(req.headers)
    if (req && req.headers){
        token = req.headers.authorization.split('')[1]
    }
    return token
}

const initializePassport = ()=>{
    
    // Register User
    passport.use("register", new LocalStrategy({
        passReqToCallback: true, usernameField: "email"}, async(req,username,password,done)=>{
        const { first_name, last_name, age, role } = req.body
        console.log("Entra aqui")
        //Validando Campos Requeridos
        let resultado = false, msj_error = ''
        if (!first_name) msj_error += (!(msj_error.trim() === '') ? '' : '\n') + 'first_name is required'
        if (!last_name) msj_error += (!(msj_error.trim() === '') ? '' : '\n') + 'last_name is required'
        if (!age) msj_error += (!(msj_error.trim() === '') ? '' : '\n') + 'age is required'
        if (!role) msj_error += (!(msj_error.trim() === '') ? '' : '\n') + 'role is required'
        if (msj_error.trim() === '')
            resultado = true

        //Validando resultado obtenido
        if (resultado) {
            //Consultando email en uso
            const user = await userService.findOne({ email: username })
            if (!user) return done(null, false, { message: `This email '${username}' is already in use` })
            //Creando registro
            const newUser = await userService.create({
                first_name, 
                last_name, 
                email: username,
                age, 
                password: createHash(password),
                role
            })
            return done(null, newUser)
        } else {
            return done(null, false, { message: msj_error })
        }
    }))
    // Log User
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async(username, password, done)=>{
        //Consultando email en uso
        const user = await userService.findOne({ email: username })
        if (!user) return done(null, false, { message: `This email '${username}' doesn't exists!` })
        //Validando contraseña
        if (isValidPassword(user, password)) return done(null, false, { message: `The password is incorrect.` })
        //Devolviendo resultado obtenido
        return done(null, user)
    }))
    // Passport JWT
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest:ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET
    }, async(jwt_payload, done)=>{
        try {
            return done(null, jwt_payload)
        } catch (error){
            return done(error)
        }
    }))
    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })
    passport.deserializeUser(async(id, done)=>{
        let user = await userService.findById(id)
        done(null, user)
    })
}

export default initializePassport