//const {User} = require('../db/index');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
//Middleware for handling authentication
function userMiddleware(req,res,next){
    //Implement user authentication logic
    //You need to check the headers and validate the user from the user table/collection in the database
    const token = req.headers.authorization;
    const words = token.split(' ');
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    if(decodedValue.username){
        req.username = decodedValue.username;
        next();
    }else{
        res.status(403).json({
            msg: "You are not authenticated so you are not authorised to access this resource."
        })
    }
    // const username= req.headers.username;
    // const password = req.headers.password;
    // User.findOne({
    //     username:username,
    //     password:password,
    // }).then((value) => {
    //     if(value){
    //         next();
    //     }
    //     else{
    //         res.status(403).json({
    //             msg: "You are not a user so you are not authorised to access this resource."
    //         })
    //     }
    // })
}

module.exports = userMiddleware;
