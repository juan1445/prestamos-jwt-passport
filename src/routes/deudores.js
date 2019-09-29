const { Router } = require('express');
const router = Router();
const Deudor = require('../models/Deudor');
const passport = require('passport');

router.get('/login', async (req, res) => {
    res.render('partials/login')
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));


router.get('/register', async (req, res) => {
    res.render('partials/register')
});

router.post('/register', async (req, res) => {

     const { name, phone, identification, email, password, lean } = req.body;
     const errors = [];
     if(name <= 0 ){
         errors.push({text:'Por favor digite su nombre'})
     }
     if(password.length < 4){
         errors.push({text: 'La contraseña debe ser al menos de 4 caracteres'})
     }
     if(errors.length > 0){
        res.render('partials/register', {errors, name, phone, identification, email, password, lean})
     }else{
         const emailDeudor = await Deudor.findOne({email: email});
         if(emailDeudor){
             req.flash('error_msg', 'El correo ya está en uso');
             res.redirect('/register');
         }
         const newDeudor = new Deudor({name, phone, identification, email, password, lean});
         newDeudor.password = await newDeudor.encryptPassword(password);
         await newDeudor.save();
         req.flash('success_msg','Estas registrado')
         res.redirect('../login')
    }
})

router.get('/cerrar-sesion', (req, res) => {
    req.logOut();
    res.redirect('/');
});


module.exports = router;