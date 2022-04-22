var express = require('express');
var walkController = require('../controllers/walkClient')
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/queryWalk', walkController.queryWalk);

module.exports = router;
