const {Router} = require('express');
const router = Router();
const adminMiddleware = require('../middlewares/admin');
const {Admin, Course} = require('../db/index');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

router.post('/signup', async(req,res) => {
    //Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    //Use zod to perform validation on above data
    //Check if the admin already exists in the database
    const user = await Admin.findOne({
        username
    })
    if(user){
        res.status(409).json({
            msg: "Admin account already exists so new account cannot be created. Please sign in."
        })
    }else{
         //Store data in database
            Admin.create({
                username: username,
                password:password
            }).then((value) => {
                    res.status(201).json({
                        msg:"Admin created successfully"
                    })
                }).catch((err) => {
                        res.status(400).json({
                            msg: "Error in creatng admin"
                        })
                    })
        }
   
})

router.post('/signin', async (req,res) => {
    //Implement admin signin logic
    const username = req.body.username;
    const password = req.body.password;
    //Check if the admin exists in the database
    const user = await Admin.findOne({
        username,
        password
    })
    if(user){
        const token = jwt.sign({username}, JWT_SECRET);
        res.status(200).json({
            msg: "Admin signed in successfully",
            token: token
        })
    }else{
        res.status(411).json({
            msg: "Invalid email address or password. Please provide correct email address and password or create a new account."
        })
    }
    
})

router.post('/courses', adminMiddleware, async (req,res) => {
    //Implement course creation logic
    const username = req.username;
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    //Use zod to perform the validation on above data
    //Store data in database
    const newCourse = await Course.create({
        username: username,
        title: title,
        price: price,
        description: description,
        imageLink: imageLink
    })
    res.status(201).json({
        msg: "Course created successfully", courseId: newCourse._id
    })
})

router.get('/courses', adminMiddleware, async(req,res) => {
    const response =  await Course.find({});
    res.status(200).json({
        courses: response
    })
})

router.get('/publishedCourses', adminMiddleware, async (req,res) =>{
    //Implement fetching of published courses logic
    const courses = await Course.find({
        username: req.username
    })
    res.status(200).json({
        courses
    })
})

module.exports = router;