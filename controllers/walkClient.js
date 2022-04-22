var WalkModel = require('../models/walk');

let queryWalk = async (req, res) => {
  let result = await WalkModel.queryWalk(req.body);
  res.send({
    code: 200,
    data: result,
    msg: 'true'
  })
}

module.exports = {
  queryWalk,
}