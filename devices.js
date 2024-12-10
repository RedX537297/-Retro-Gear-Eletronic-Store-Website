const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/register',(req,res)=>{
    res.render('registration');
});

router.get('/login',(req,res)=>{
    res.render('login');
});

router.get('/logout',(req,res)=>{
    res.render('logout');
});

router.get('/show-devices',(req,res)=>{
    if(req.session.user){
        //user is authenticated

        const user = req.session.user;

        res.render('show-devices',{user});
    }
    else {
        res.redirect('/login');
    }
});

router.post('/register',(req,res)=>{
    const {user,password} = req.body;

    bcrypt.hash(password,10,(err,hash)=>{
        if(err){
            console.log("Password hashing error: ",err);
            return res.redirect('/register');
        }
        res.redirect('/login');
        const insertQuery = "INSERT INTO user (username,password) VALUES (?,?)"
        db.query(insertQuery,[user,hash],(err,result)=>{
            console.error("Database insert error: ",err);
            res.redirect('/register');
        });
    });
});

router.post('/login',(req,res)=>{
    const {username,password} = req.body;

    const selectQuery = "SELECT * FROM user WHERE unsername = ?";

    db.query(selectQuery, [username],(req,res)=>{
        if(err){
            console.error("Error retrieving the user: ",err);
            return res.redirect('/login');
        }
        if(result.lenght === 0){
            //user was not found in the database
            return res.redirect('/login');
        }

        const user = result[0]; // {user: isaac, password: 3614ImB@7250}

        bcrypt.compare(password, user.password,(err,result)=>{
            if(result){
                req.session.user = user;
                res.redirect('/show-devices'); //user already logged in
            }
            else{
                res.redirect('/login');
            }
        });
    });
});

router.post('/logout',(req,res)=>{
    const {username,password} = req.body;

    const selectQuery = "SELECT * FROM user WHERE unsername = ?";

    db.query(selectQuery, [username],(req,res)=>{
        if(err){
            console.error("Error retrieving the user: ",err);
            return res.redirect('/logout');
        }
        if(result.lenght === 0){
            //user was not found in the database
            return res.redirect('/logout');
        }

        const user = result[0];

        bcrypt.compare(password, user.password,(err,result)=>{
            if(result){
                req.session.user = user;
                res.redirect('/show-devices');
            }
            else{
                res.redirect('/logout');
            }
        });
    });
});

module.exports = router;