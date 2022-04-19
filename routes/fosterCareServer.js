var express = require('express');
var fosterCareController = require('../controllers/fosterCareServer')
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/deleteFosterCare', fosterCareController.deleteFosterCare);
router.post('/queryFosterCare', fosterCareController.queryFosterCare);
router.post('/updateFosterCare', fosterCareController.updateFosterCare);

module.exports = router;
