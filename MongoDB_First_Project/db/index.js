const mongoose = require('mongoose');

//Connect to MongoDB
mongoose.connect('mongodb+srv://manav:Sakshikothadiya%4063@cluster0.2ix4omb.mongodb.net/Courses_Selling_App');

//Define Schemas
const AdminSchema = new mongoose.Schema({
    //Schema definition here
    username: String,
    password: String,
    publishedCourses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses'
    }]
});

const UserSchema = new mongoose.Schema({
    //Schema definition here
    username: String,
    password: String,
    purchasedCourses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses'
    }]
});

const CourseSchema = new mongoose.Schema({
    //Schema definition here
    username: String,
    title: String,
    description: String,
    price: Number,
    imageLink: String
});

//Define Models
const Admin = mongoose.model('Admins', AdminSchema);
const User = mongoose.model('Users', UserSchema);
const Course = mongoose.model('Courses', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}