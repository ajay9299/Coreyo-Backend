// Import all required packages
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from './config.js';
import cookieParser from "cookie-parser";
import routes from './src/v1/routes/index.js'
import { statusCodes } from './constants/statusCodes.js';
import { messages } from './constants/messages.js';

const app = express();

// Port based on environments
const PORT = process.env.PORT || 3000;

// Use middleware in order to logs hit apis on server
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use((req, res, next) => {
    const infoOfState = req.method + ' ' + res.statusCode + ' ' + req.url;
    console.log('API HIT -------------->', infoOfState, '\n|\nv\n|\nv\n');
    next();
  });  

  
// Use all present routes in server
app.use('/api',routes)

// Log the environment 
console.log(`Environment ===> ${process.env.NODE_ENV}`) 

// Db connection
// const {url} = config.db;
// mongoose
//   .connect(url, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then((result) => {
//     console.log("===== Connected to MongoDB =====");
//   })
//   .catch((err) => {
//     throw new Error("MongoDB Connection Error!", err);
//   });

// This should be the last route else any after it wont work
app.use("*", (req, res) => {
  res.status(statusCodes.NOT_FOUND).json({
    success: false,
    message: messages.ROUTE_NOT_FOUND,
    error: {
      statusCode: statusCodes.NOT_FOUND,
      message: messages.ROUTE_NOT_FOUND,
    },
  });
});

// Handling the other errors
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    error: {
      statusCode: err.statusCode || 500,
      message: "Server error",
    },
  });
});


// Server listener 
app.listen(PORT,()=>{
  console.log(`Server is Up on port ===> ${PORT}`)
})



