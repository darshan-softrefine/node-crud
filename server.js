const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const app = require('./app');



mongoose.set('strictQuery', false);
mongoose.connect(process.env.URL).then(() => {

    console.log('Connected to the database ');

}).catch((err) => {

    console.error(`Error connecting to the database. n${err}`);
});



app.listen(process.env.PORT, function () {
    console.log(`server running on ${process.env.PORT}`);
});