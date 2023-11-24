// import all the necessary dependencies
require('dotenv').config(); // provides URL string
const connectDB = require('./connectDB/connectDB'); // provides connection object
const Product = require('./models/model'); // provides DB schema      object
const data = require('./products_collection'); // provides the data which to be populated
// Now we have all the necessary dependencies, time to put them together

const startPopulating = async() =>{
       try {
              console.log('================================');
              await connectDB(process.env.URL); //create connection using authentication strings
              await Product.deleteMany(); // clean the database for the new items
              await Product.create(data); // populate the database with the new items
              console.log('populating is concluded successfully!!'); // if process gets here that means no issue
              process.exit(0); // exit the process
       }catch(e){
              console.log('================================');
              console.log(e);
              process.exit(1);
       }
};

startPopulating();