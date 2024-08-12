// const express=require('express');
// const multer=require('multer')
// const path = require('path');
// const bodyParser = require('body-parser');
// const mongoose=require('mongoose')
// const routes=require('./public/routes/bookroutes')

// const app=express();
// const port= process.env.PORT || 3000

// app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:27017/library_management_system')

// mongoose.connection.on('connected', () => {
//     console.log('Mongoose connected to');
//   });
  
//   mongoose.connection.on('error', (err) => {
//     console.log('Mongoose connection error: ' + err);
//   });
  
//   mongoose.connection.on('disconnected', () => {
//     console.log('Mongoose disconnected');
//   });


// app.get('/',(req,res)=>{
//     res.send("Welcome to Library Management System")
// })

// app.use('/api/',routes)

// app.listen(port,()=>{
//     console.log(`the server is running at ${port}`)
// })
