let mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let CategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true, index: { unique: true } },
})


let CategoryModel = mongoose.model('Category', CategorySchema);
CategoryModel.createIndexes();

// 增删改查
let addCategory = (data) => {
  let obj = new CategoryModel(data);
  return obj.save()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

let deleteCategory = (categoryName)=>{
  return CategoryModel.deleteOne({ categoryName })
}

let updateCategory = (data)=>{
  return CategoryModel.updateOne({id: data.id}, data)
}

let queryCategory = (data)=>{
  let { page, limit } = data;
  console.log(data);
  return CategoryModel.find().skip((page - 1)*parseInt(limit)).limit(parseInt(limit));
}

module.exports = {
  addCategory,
  deleteCategory,
  updateCategory,
  queryCategory
}