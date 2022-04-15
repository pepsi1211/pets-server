var CategoryModel = require('../models/category');

// 增
var addCategory = async (req, res) => {
  const { categoryName } = req.body;

  var result = await CategoryModel.addCategory({
    categoryName,
  });

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

var deleteCategory = async (req, res) => {
  const { categoryName } = req.body;

  var result = await CategoryModel.deleteCategory(categoryName);

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

let updateCategory = async (req, res) => {
  const data = req.body;
  let result = await CategoryModel.updateCategory(data);
  res.send({
    code: 200,
    data: result,
    msg: 'true'
  })
}

let queryCategory = async (req, res) => {
  let result = await CategoryModel.queryCategory(req.body);
  res.send({
    code: 200,
    data: result,
    msg: 'true'
  })
}

module.exports = {
  addCategory,
  deleteCategory,
  updateCategory,
  queryCategory
}