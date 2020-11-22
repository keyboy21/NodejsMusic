const express = require("express");
const bcrypt = require('bcryptjs')
const router = express.Router();

// Model Ulimiz:
const User = require('../model/User');
const passport = require("passport");

router.get('/registr', (req, res) => {
    res.render('registr', {
        title: 'Registrasiya qismi'
    })
})


// Registrasiya POST 

router.post('/registr', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const password2 = req.body.password2

    req.checkBody('name', `Isim bo'sh bo'lmasligi kerak`).notEmpty()
    req.checkBody('email', `email bo'sh bo'lmasligi kereak`).notEmpty()
    req.checkBody('email', `email Email bo'lishi shart kereak`).notEmpty()
    req.checkBody('username', `laqabing bo'sh bo'lmasligi kereak`).notEmpty()
    req.checkBody('password', `parol kriritishingz kereak`).notEmpty()
    req.checkBody('password2', `parol tepadagi  parol bilan bir xil bo'lish kerak`).equals(req.body.password)

    const errors = req.validationErrors();

    if(errors){
        res.render('registr', {
            errors: errors
        })
    }

    else{
        const newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
        });
        
        bcrypt.genSalt(10, (err, pass) => {
            bcrypt.hash(newUser.password, pass, (err, hash) => {
                if(err){
                   console.log(err);
                }
                newUser.password = hash
                newUser.save((err) => {
                    if(err) {
                        console.log(err);
                    }
                    else{
                        req.flash('success', `Registrasiyadan oting`)
                        res.redirect('/login')
                    }
                })
            })
        })

    }


})

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login Sahifasi'
    })
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next)
})

// logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Mufiqatli tizimdan chiqb ketingiz')
    res.redirect('/login')
})


module.exports = router;
