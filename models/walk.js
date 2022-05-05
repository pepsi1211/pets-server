// 喂猫遛狗
let mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

let WalkSchema = new mongoose.Schema({
  title: { type: String },
  subtitle: { type: String },
  price: { type: String },
  pic: { type: String },
});

let WalkModel = mongoose.model("walk", WalkSchema);
WalkModel.createIndexes();

// 增删改查
let addWalk = (data) => {
  let obj = new WalkModel(data);
  return obj
    .save()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

let deleteWalk = (title) => {
  return WalkModel.deleteOne({ title });
};

let updateWalk = (data) => {
  let params = {
    title: data.title,
    subtitle: data.subtitle,
    price: data.price,
    pic: data.pic,
  };
  return WalkModel.updateOne({ _id: data._id }, params);
};

let queryWalk = (data) => {
  let { page, limit } = data;
  return WalkModel.find()
    .skip((page - 1) * parseInt(limit))
    .limit(parseInt(limit));
};

module.exports = {
  addWalk,
  deleteWalk,
  updateWalk,
  queryWalk,
};
