var ProductModel = require('../models/product');

// 增
var addProduct = async (req, res) => {
  var result = await ProductModel.addProduct(req.body);

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

var deleteProduct = async (req, res) => {
  const { title } = req.body;

  var result = await ProductModel.deleteProduct(title);

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

let updateProduct = async (req, res) => {
  const data = req.body;
  let result = await ProductModel.updateProduct(data);
  res.send({
    code: 200,
    data: result,
    msg: 'true'
  })
}

let queryProduct = async (req, res) => {
  let result = await ProductModel.queryProduct(req.body);
  res.send({
    code: 200,
    data: result,
    msg: 'true'
  })
}

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  queryProduct
}