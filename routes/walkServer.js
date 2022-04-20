var express = require('express');
var walkController = require('../controllers/walkServer')
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/addWalk', walkController.addWalk);
router.post('/deleteWalk', walkController.deleteWalk);
router.post('/queryWalk', walkController.queryWalk);
router.post('/updateWalk', walkController.updateWalk);

module.exports = router;
