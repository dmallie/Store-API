// import dependencies from package
const express = require('express');
const app = express();
// import dependencies from modules
const connectDB = require('./connectDB/connectDB');
const routes = require('./routes/routes');
const errorHandlerMiddleware = require('./middleware/errorHandler');
// set the middleware
       // to handle all errors centrally
       app.use(errorHandlerMiddleware);
       // to set the base path
       const basePath = '/api/v1/products';
       app.use(basePath, routes);
       // to read req.body
       app.use(express.json());
       // 
       app.use(express.urlencoded({ extended: true }));
       // import cors package
       const cors = require('cors');
       app.use(cors());
// Define port
require('dotenv').config();
const port = process.env.PORT || 3300;
// create a function that connects withe the database
const startListening = async() => {
       try{
              // invoke connection with DB
              await connectDB(process.env.URL);
              // start the server to listen on port
              app.listen(port, () => {
                     console.log(`listening on port ${port}`);
              });
       }catch(err){
              console.log(err);
       }
};
// invoke the function
startListening();
