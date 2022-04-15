let mongoose = require('mongoose');
// mongoose.set('useCreateIndex', true);

let ProductSchema = new mongoose.Schema({
  price: { type: String, required: true },
  image: [{ url: String }],
  DetailsFigure: { type: String },
  title: { type: String, require: true, unique: true },
  guid: { type: String },
  categoryId: { type: String }
})


let ProductModel = mongoose.model('product', ProductSchema);
// ProductModel.createIndexes();

let addProduct = (data) => {
  console.log(data);
  let obj = new ProductModel(data);
  return obj.save()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

let deleteProduct = (title) => {
  return ProductModel.deleteOne({ title })
}

let updateProduct = (data) => {
  return ProductModel.updateOne({ id: data.id }, data)
}

let queryProduct = (data) => {
  let { page, limit } = data;
  return ProductModel.find().skip((page - 1) * parseInt(limit)).limit(parseInt(limit));
}

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  queryProduct
}