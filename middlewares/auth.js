const {getUser} = require('../service/auth');

async function restrictToLoggedInUser(req, res, next){
    const uuid = req.cookies?.uid;
    if(!uuid)   return res.render('login');
    const user = getUser(uuid);
    if(!user)   return res.render('login');

    req.user = user;
    next();
}

async function checkAuth(req, res, next){
    const uuid = req.cookies?.uid;
    const user = getUser(uuid);
    req.user = user;
    next();
}
module.exports = {restrictToLoggedInUser, checkAuth};