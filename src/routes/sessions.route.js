import { Router } from 'express';
import passport from 'passport';
import { authorization, passportCall, generateToken } from '../middleware/auth.js'

const router = Router();

// Registro de Usuario
router.post('/register', (req, res, next) =>{
    passport.authenticate('register', { session: false, failureRedirect: '/failregister' }, (err, user, info)=>{
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!user) {
            return res.status(400).json({ message: info.message });
        }
        //console.log(user)
        res.send({ status: "success", user })
    })(req, res, next)
})
router.get('/failregister', async (req, res) => {
    console.log('Estrategia fallida')
    res.send({ error: "Failed" })
})

// Inicio de Sesión de Usuario
router.post('/login', (req, res, next) =>{
    passport.authenticate('login', { session: false, failureRedirect: '/faillogin' }, (err, user, info)=>{
        if (err) return next(err);
        if (!user) {
            //console.log(info.message);
            return res.status(401).json({ message: info.message });
        }
        const token = generateToken(user)
        res.cookie("jwt", token, { httpOnly: true, secure: false });//*/
        console.log(`Token en api/sessions/login: ${token}`)
        res.send({ status: "success", user: {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
        } })

    })(req, res, next)
})
router.get('/faillogin', async (req, res) => {
    console.log('Estrategia fallida')
    res.send({ error: "Failed" })
})

// Ruta de validación de autenticación
router.get('/current', passportCall('jwt'), authorization('user'), (req, res) => {
    try {
        if (req.user){
            res.status(200)
            .json({
                status: "success",
                user: req.user
            })
        }
        else {
            res.send({ error: 'No autorizado: '+req.error })
        }
    } catch (err) {
        res.send({ error: err })
    }
})

router.get('/logout', (req, res) => {
    // Limpiar la cookie
    res.clearCookie('jwt');
    // Redirigir al inicio
    res.redirect('/');
});


export default router;