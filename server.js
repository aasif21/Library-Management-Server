const express=require('express');
const path = require('path');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const mongoose=require('mongoose')
const routes=require('./public/routes/bookroutes')
require('dotenv').config();



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

  const serviceAccount1={
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNI_DOMAIN
  };
  console.log(serviceAccount1)
 


  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount1)
  });

app.get('/',(req,res)=>{
    res.send("Welcome to Library Management System")
})

app.use('/api/',routes)

app.listen(port,()=>{
    console.log(`the server is running at ${port}`)
})
