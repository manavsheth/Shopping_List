const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');


//Mentioning what to use before accessing the routes or hitting the route endpoints or hitting the API endpoints or mentioning all the middlewares to use before accessing the routes.

app.use(bodyParser.json());
app.use('/admin', adminRouter);
app.use('/user', userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
