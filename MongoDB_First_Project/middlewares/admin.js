//const {Admin} = require('../db/index');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
//Middleware for handling authentication
function adminMiddleware(req,res,next){
    //Implement admin authentication logic
    //You need to check the headers and validate the admin from the admin table/collection in the database
    try{
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
    }catch(err){
        res.json({
            msg: "Incorrect inputs."
        })
    }
    // const username = req.headers.username;
    // const password = req.headers.password;
    // Admin.findOne({
    //     username: username,
    //     password:password
    // }).then((value) => {
    //     if(value){
    //         next();
    //     }
    //     else{
    //         res.status(403).json({
    //             msg: "You are not an admin so you are not authorised to access this resource."
    //         })
    //     }
    // })
}

module.exports = adminMiddleware;