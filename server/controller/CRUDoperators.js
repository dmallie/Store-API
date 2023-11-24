// import database collection schema from models
const Product = require('../models/model');
const getAllProductsStatic = async(req, res) => {
       const products = await Product.find({ price: { $gt: 30 }})
                     .sort('price')
                     .select('name price');
       
       res.status(200).json({products,
                            nbHits: products.length });
};
const getAllProducts = async (req, res) => {
       console.log("req.query: ", req.query);
       // destructure the query and extract only the parameters
       const { featured, company, name, sort, fields, numericFilters } = req.query;
       const queryObject = {};
     
       if (featured) {
         queryObject.featured = featured === 'true' ? true : false;
       }
       if (company) {
         queryObject.company = company;
       }
       // $options: 'i' is for case insensitive 
       if (name) {
         queryObject.name = { $regex: name, $options: 'i' };
       }
       if (numericFilters) {
         const operatorMap = {
           '>': '$gt',
           '>=': '$gte',
           '=': '$eq',
           '<': '$lt',
           '<=': '$lte',
         };
         const regEx = /\b(<|>|>=|=|<|<=)\b/g;// regular expression
         let filters = numericFilters.replace(
           regEx,
           (match) => `-${operatorMap[match]}-`
         );
         const options = ['price', 'rating'];
         filters = filters.split(',').forEach((item) => {
           const [field, operator, value] = item.split('-');
           if (options.includes(field)) {
             queryObject[field] = { [operator]: Number(value) };
           }
         });
       }
       console.log('queryObject: ', queryObject);
       let result = Product.find(queryObject);
       // sort
       if (sort) {
         const sortList = sort.split(',').join(' ');
         result = result.sort(sortList);
       } else {
         result = result.sort('createdAt');
       }
     
       if (fields) {
         const fieldsList = fields.split(',').join(' ');
         result = result.select(fieldsList);
       }
       // number of products in a page is 
       // either the user set as a page or 1 as default value
       const page = Number(req.query.page) || 1;
       // the maximum number of products in a page is 10
       const limit = Number(req.query.limit) || 10;

       const skip = (page - 1) * limit;
     
       result = result.skip(skip).limit(limit);
       // 23
       // 4 7 7 7 2
     
       const products = await result;
       res.status(200).json({ products, nbHits: products.length });
     };

module.exports = {
       getAllProducts,
       getAllProductsStatic,
     };