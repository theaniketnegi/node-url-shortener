const jwt = require('jsonwebtoken');
const secret = '!214@$@$%!';

function setUser(user){
    return jwt.sign({
        id: user._id,
        email: user.email
    }, secret);
}

function getUser(token){
    if(!token)  return null
    return jwt.verify(token, secret);
}

module.exports={setUser, getUser}; 