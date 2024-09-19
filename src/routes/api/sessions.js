import { Router } from 'express';
import User from '../../models/user.js';
import passport from 'passport';
import { authorization, passportCall } from '../../utils.js'

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }),
async (req, res)=>{
    res.send({status: "success", message: "Usuario registrado"})
})

// Ruta de validación de autenticación
router.get('/current', passportCall('jwt'), authorization('user'), (req, res) => {
    res.send(req.user)
})


export default router;