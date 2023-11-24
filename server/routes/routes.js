// import dependencies 
const express = require('express');
const router = express.Router();
// import CRUD operators from controller
const {getAllProducts, getAllProductsStatic } = require('../controller/CRUDoperators');
// set route path
router.route('/').get(getAllProducts);
router.route('/static').get(getAllProductsStatic);
// export router
module.exports = router;