const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Deudor = require('../models/Deudor');


passport.use(new localStrategy({
    usernameField: 'email'
}, async (email, password, done)=>{
    const deudor = await Deudor.findOne({email: email});
    if(!deudor){
        return done(null, false, {message: 'Usuario no encontrado'});
    }else{
        const match = await deudor.matchPassword(password);
        if(match){
            return done(null, deudor);
        }else{
            return done(null, false, {message: 'Contraseña incorrecta'});
        }
    }
}));

passport.serializeUser((deudor, done) =>{
    done(null, deudor.id);
});

passport.deserializeUser((id, done)=>{
    Deudor.findById(id, (err, deudor)=>{
        done(err, deudor);
    });
});