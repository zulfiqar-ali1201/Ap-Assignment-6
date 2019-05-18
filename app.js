const express=require('express');
const bodyParser=require('body-parser');
const dbmodel=require('./config/database.config');
const mongoose=require('mongoose');

//Creating Express App
const app=express();

//content-type parse and encoding url
app.use(bodyParser.urlencoded({extended:true}))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
mongoose.Promise=global.Promise;

//connecting with the database
mongoose.connect(dbmodel.url,{
    useNewUrlParser:true
}).then(()=>{
    console.log('Database is Connected Successfully');
}).catch(err=>{
    console.log('Database Connection Failed',err);
    process.exit();
});

//defining welcome Route
app.get('/',(req, res)=>{
    res.json({"Message":"Welcome to USER Handling App"});
});

//Requiring the Routes
require('./app/routes/users.routes')(app);

//Defining listening for Requesting
app.listen('3052',()=>{
    console.log('Server is Listening fromt the Port 3050');
});



