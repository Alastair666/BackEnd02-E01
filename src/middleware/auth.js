import bcrypt from 'bcrypt'
import passport from 'passport'
import jwt from 'jsonwebtoken'

/**
 * Funciones de encriptación para la contraseña
 * **/
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

/**
 * Funciones para autenticar la petición
 * **/
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) {
                return next(err)
            }
            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
            }

            req.user = user
            next()
        })

            (req, res, next)
    }
}
/**
 * Funciones para autorizar la solicitud
 * **/
export const authorization = (role) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send({ error: "Unauthorized" })
        if (req.user.role !== role) return res.status(403).send({ error: "No permission" })
        next()
    }
}
/**
 * Funciones para gestionar el token JWT
 * **/
export const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
}
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
}