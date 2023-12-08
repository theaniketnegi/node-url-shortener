const { json } = require('express');
const User = require('../models/user.js');
const {setUser} = require('../service/auth.js');
async function handleUserSignup(req, res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.redirect("/");
}

async function handleUserLogin(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if(!user) return res.render('login', {err:'Wrong email/password'})
    
    const token = setUser(user);
    // res.cookie("uid", token);
    // return res.redirect("/");
    return res.json({token});
}
module.exports={handleUserSignup, handleUserLogin};
