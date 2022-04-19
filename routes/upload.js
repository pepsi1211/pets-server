var express = require('express');
var fileController = require('../controllers/upload');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'public/uploads/' })


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/upload', upload.single('file'), fileController.addOrUpdateFile);
// router.post('/getPic', fileController.queryFile);

module.exports = router;
