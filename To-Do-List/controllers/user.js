const User = require("../models/user");
const {v4:uuidv4} = require('uuid')
const { setUser } = require('../service/auth')

async function handleUserSignup(req, res){
    const {username, email, password} = req.body;

    await User.create({
        username,
        email,
        password,
    })

    return res.render("home");
}

async function handleUserLogin(req, res){
    const {username, password} = req.body;
    console.log(username + " " + password);
    const user = await User.findOne({username, password});
    console.log(user);
    if(!user) return res.render("login", {
        error : "Invalid Username or Password"
    }); 

    const sessionID = uuidv4();
    setUser(sessionID, user);
    res.cookie("uid", sessionID);
    return res.redirect("/app")
}

module.exports = {
    handleUserSignup,
    handleUserLogin
};