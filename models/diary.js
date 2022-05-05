// 伴宠日记
let mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

let DiarySchema = new mongoose.Schema({
  video: { type: String, default: "" },
  diary: { type: String, default: "" },
  tag: { type: String, default: "" },
  dateTime: { type: Date, default: Date.now() },
  userName: { type: String, default: "" },
  avatar: {
    type: String,
    default: "http://47.106.185.150/uploads/default.jpg",
  },
});

let DiaryModel = mongoose.model("diary", DiarySchema);
DiaryModel.createIndexes();

// 增删改查
let addDiary = (data) => {
  let obj = new DiaryModel(data);
  return obj
    .save()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

let deleteDiary = (id) => {
  return DiaryModel.deleteOne({ _id: id });
};

let updateDiary = (data) => {
  return DiaryModel.updateOne({ _id: data.id }, data);
};

let queryDiary = (data) => {
  let { page, limit } = data;
  return DiaryModel.find()
    .skip((page - 1) * parseInt(limit))
    .limit(parseInt(limit));
};

module.exports = {
  addDiary,
  deleteDiary,
  updateDiary,
  queryDiary,
};
