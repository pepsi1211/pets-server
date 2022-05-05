var express = require('express');
var diaryController = require('../controllers/diary')
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/addDiary', diaryController.addDiary);
router.post('/deleteDiary', diaryController.deleteDiary);
router.post('/queryDiary', diaryController.queryDiary);

module.exports = router;
