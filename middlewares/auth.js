const {getUser} = require('../service/auth');

async function restrictToLoggedInUser(req, res, next){
    const uuid = req.headers['authorization'];
    if(!uuid)   return res.render('login');
    const token = uuid.split("Bearer ")[1];
    const user = getUser(token);
    if(!user)   return res.render('login');

    req.user = user;
    next();
}

async function checkAuth(req, res, next){
    const uuid = req.headers['authorization'];
    let token = ""
    if(uuid)
        token = uuid.split("Bearer ")[1];
    const user = getUser(token);
    req.user = user;
    next();
}
module.exports = {restrictToLoggedInUser, checkAuth};