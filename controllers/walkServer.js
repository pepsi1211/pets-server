var WalkModel = require('../models/walk');

var addWalk = async (req, res) => {
  var result = await WalkModel.addWalk(req.body);

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

var deleteWalk = async (req, res) => {
  const { title } = req.body;

  var result = await WalkModel.deleteWalk(title);

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

let updateWalk = async (req, res) => {
  const data = req.body;
  let result = await WalkModel.updateWalk(data);
  res.send({
    code: 200,
    data: result,
    msg: 'true'
  })
}

let queryWalk = async (req, res) => {
  let result = await WalkModel.queryWalk(req.body);
  res.send({
    code: 200,
    data: result,
    msg: 'true'
  })
}

module.exports = {
  addWalk,
  queryWalk,
  updateWalk,
  deleteWalk
}