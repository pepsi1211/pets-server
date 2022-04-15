var express = require('express');
var productController = require('../controllers/product')
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/addProduct', productController.addProduct);
router.post('/deleteProduct', productController.deleteProduct);
router.post('/updateProduct', productController.updateProduct);
router.post('/queryProduct', productController.queryProduct);

module.exports = router;
