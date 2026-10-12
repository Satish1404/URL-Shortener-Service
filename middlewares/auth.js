const {getUser} = require('../service/auth')

function checkForAuthorization(req,res,next){
   const cookieToken = req.cookies.token
   req.user = null
    if(!cookieToken) return next();
     const token = cookieToken
     const user = getUser(token)

    req.user = user
    return next()

}

function restrictTO(role){
  return function(req, res, next){
    if(!req.user) return res.redirect('/login');
    if(!role.includes(req.user.role)) return res.end('unAuthorized');
    return next();
  }
}
 
module.exports ={
  checkForAuthorization,
  restrictTO
}