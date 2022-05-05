var DiaryModel = require("../models/diary");

// 增
var addDiary = async (req, res) => {
  var result = await DiaryModel.addDiary(req.body);

  if (result) {
    res.send({
      code: 200,
      msg: "true",
    });
  } else {
    res.send({
      code: 404,
      msg: "false",
    });
  }
};

let deleteDiary = async (req, res) => {
  var result = await DiaryModel.deleteDiary(req.body.id);
  if (result) {
    res.send({
      code: 200,
      msg: 'true'
    })
  } else {
    res.send({
      code: 404,
      msg: 'false'
    })
  }
};

let queryDiary = async (req, res) => {
  let result = await DiaryModel.queryDiary(req.body);
  res.send({
    code: 200,
    data: result,
    msg: "true",
  });
};

module.exports = {
  addDiary,
  queryDiary,
  deleteDiary
};
