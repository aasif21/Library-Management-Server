const express=require('express');
const path = require('path');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const mongoose=require('mongoose')
const routes=require('./public/routes/bookroutes')

const app=express();
const port= process.env.PORT || 3000

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://aasif21ali:fahad123@librarymanagementsystem.tee7d.mongodb.net/')

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to');
  });
  
  mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });

  var serviceAccount = require("./library-management-syste-69f93-firebase-adminsdk-q0c4g-856f214373.json");
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

app.get('/',(req,res)=>{
    res.send("Welcome to Library Management System")
})

app.use('/api/',routes)

app.listen(port,()=>{
    console.log(`the server is running at ${port}`)
})
