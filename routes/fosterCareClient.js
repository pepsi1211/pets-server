var express = require('express');
var fosterCareController = require('../controllers/fosterCareClient')
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/addFosterCare', fosterCareController.addFosterCare);
router.post('/queryFosterCare', fosterCareController.queryFosterCare);

module.exports = router;
