const User = require('../models/user');
const {v4: uuidv4} = require('uuid');
const {setUser} = require('../service/auth')


async function handleUserSignup(req,res){
    const {name, email, password} = req.body
    //if(!name || !email || !password)  return res.render('signup',{error: "all field required"})
    await User.create({
    name,
    email,
    password
    })
   return res.render('login');
}

async function handleUserLogin(req,res){
    const {email,password} = req.body
    
    const user = await User.findOne({email,password})
    if(!user) return res.render('login',{error: "Invalid credentioal"})

    const token = setUser(user);
     res.cookie('token', token)
    return res.redirect('/');
  
}

module.exports= {
    handleUserSignup,
    handleUserLogin
}