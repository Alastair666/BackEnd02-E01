import bcrypt from 'bcrypt'
import passport from 'passport'

// Hashear la contraseña
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// Validar la contraseña
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)//*/

// Autentica la petición
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

// Autoriza la solicitud
export const authorization = (role) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send({ error: "Unauthorized" })
        if (req.user.role !== role) return res.status(403).send({ error: "No permission" })
        next()
    }
}