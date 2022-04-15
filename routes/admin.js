var express = require('express');
var adminController = require('../controllers/admin')
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/getToken', adminController.getToken);
router.post('/register', adminController.register);
router.post('/getUserInfo', adminController.getUserInfo);

module.exports = router;
