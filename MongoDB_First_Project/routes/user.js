const {Router} = require('express');
const router = Router();
const userMiddleware = require('../middlewares/user');
const {User, Course} = require('../db/index');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

//User routes
router.post('/signup', async (req,res) => {
    //Implement signup logic
    const username = req.body.username;
    const password = req.body.password;
    //use zod to perform the validation on above data
    
    //Check if the user already exists in the database
    const user = await User.findOne({
        username
    })
    if(user){
            res.status(409).json({
                msg: "User account already exists so new account cannot be created. Please sign in."
            })
    }
        //Store data in database
        User.create({
            username: username,  
            password: password
        }).then((value) => {
                res.status(201).json({
                msg: "User created successfully"
                })
            }).catch((err) => {
                    res.status(400).json({
                    msg: "Error in creating the user"
                    })
                })

})

router.post('/signin', async (req,res) => {
    //Implement user signin logic
    const username = req.body.username;
    const password = req.body.password;
    //Check if the user exists in the database
    const user = await User.findOne({
        username,
        password
    })
    if(user){
        const token = jwt.sign({username}, JWT_SECRET);
        res.status(200).json({
            msg: "User signed in successfully",
            token
        })
    }else{
        res.json({
            msg: "Invalid email address or password. Please provide correct email address and password or create a new account."
        })
    }
})

router.get('/courses', async (req,res) => {
    //Implement course fetching logic
    const response = await Course.find({});
    res.status(200).json({
        courses: response
    })
})

router.post('/courses/:courseId', userMiddleware, async(req,res) => {
    //Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.username;
    //Check if course is already purchased or not
    const user = await User.findOne({
        username
    })
    if(user.purchasedCourses.includes(courseId)){
        res.status(400).json({
            msg: "Purchase failed, because course is already purchased."
        })
    }
    //Store data in database
    User.updateOne({
        username: username
    }, {
            "$push": {
                purchasedCourses: courseId
            }
        }).catch((e) => {
            res.status(400).json({
                msg: "Error in purchasing the course"
            })
        })

    res.status(200).json({
        msg: "Course purchased successfully"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req,res) => {
    //Implement purchased courses fetching logic
    const user = await User.findOne({
        username: req.username
    })
    const courses = await Course.find({
        _id:{
            "$in" : user.purchasedCourses
        }
    })
    res.status(200).json({
        courses: courses
    })
})



module.exports = router;