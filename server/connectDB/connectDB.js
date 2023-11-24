// import dependencies
const mongoose = require('mongoose');
// initiate the connection wtih the database
const connectDB = (url) =>{
       return mongoose.connect(url)
};
// export the connection object
module.exports = connectDB;