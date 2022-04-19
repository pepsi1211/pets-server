var FosterCareModel = require('../models/fosterCare');

var deleteFosterCare = async (req, res) => {
  const { phone } = req.body;

  var result = await FosterCareModel.deleteFosterCare(phone);

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

let updateFosterCare = async (req, res) => {
  const data = req.body;
  let result = await FosterCareModel.updateFosterCare(data);
  res.send({
    code: 200,
    data: result,
    msg: 'true'
  })
}

let queryFosterCare = async (req, res) => {
  let result = await FosterCareModel.queryFosterCare(req.body);
  res.send({
    code: 200,
    data: result,
    msg: 'true'
  })
}

module.exports = {
  deleteFosterCare,
  updateFosterCare,
  queryFosterCare
}