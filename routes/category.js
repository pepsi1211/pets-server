var express = require('express');
var categoryController = require('../controllers/category')
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/addCategory', categoryController.addCategory);
router.post('/deleteCategory', categoryController.deleteCategory);
router.post('/updateCategory', categoryController.updateCategory);
router.post('/queryCategory', categoryController.queryCategory);

module.exports = router;
