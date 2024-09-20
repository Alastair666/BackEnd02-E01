import { Router } from 'express';
import passport from 'passport';
import { authorization, passportCall, generateToken } from '../middleware/auth.js'

const router = Router();

router.get('/echo', async (req,res)=>{
    res.send({ status: "success", message: "Funciona" })
})

// Registro de Usuario
router.post('/register', 
    passport.authenticate('register', { session: false }), 
    async (req, res) => {
        console.log("Entra aqui")
    res.send({ status: "success", message: "Registered User!" })
});
router.get('/failregister', async (req, res) => {
    console.log('Estrategia fallida')
    res.send({ error: "Failed" })
})

// Inicio de Sesión de Usuario
router.post('/login', 
    passport.authenticate('login', { session: false, failureRedirect: '/faillogin' }), 
    async (req, res) => {
    // const { email, password } = req.body;
    try {
        if (!req.user) 
            return res.status(400).send({ status: "error", error: "Credenciales invalidas" })

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email
        }
        const token = generateToken(req.session.user)
        res.cookie("jwt", token, { httpOnly: true, secure: false });
        res.send({ status: "success", payload: req.user })
    }
    catch (err) {
        res.status(500).send({ status: "error", error: err})
    }
})

// Ruta de validación de autenticación
router.get('/current', passportCall('jwt'), authorization('user'), (req, res) => {
    res.send(req.user)
})


export default router;