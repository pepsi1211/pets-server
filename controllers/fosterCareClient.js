var FosterCareModel = require('../models/fosterCare');

// 增
var addFosterCare = async (req, res) => {
  var result = await FosterCareModel.addFosterCare(req.body);

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
}

let queryFosterCare = async (req, res) => {
  let result = await FosterCareModel.queryFosterCareOne(req.body.id);
  res.send({
    code: 200,
    data: result,
    msg: 'true'
  })
}

module.exports = {
  addFosterCare,
  queryFosterCare
}