let mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

let FosterCareSchema = new mongoose.Schema({
  type: { type: String }, // 寄养类型
  overviewPic: { type: String }, // 总览图
  previewPic: { type: String }, // 阳台预览图
  phone: { type: String }, // 手机号
  wechat: { type: String }, // 微信号
  fosterCareName: { type: String }, // 寄养名
  rates: { type: String }, // 收费标准
  area: { type: String }, // 面积
  supplies: { type: String }, // 物资
  tag: { type: String }, // 标签
  state: { type: Number, default: 1 }, // 1 待审核 2 审核通过 0 审核失败
});

let FosterCareModel = mongoose.model("fosterCareClient", FosterCareSchema);
FosterCareModel.createIndexes();

// 增删改查
let addFosterCare = (data) => {
  let obj = new FosterCareModel(data);
  return obj
    .save()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

let deleteFosterCare = (phone) => {
  return FosterCareModel.deleteOne({ phone });
};

let updateFosterCare = (data) => {
  return FosterCareModel.updateOne({ id: data.id }, data);
};

let queryFosterCare = (data) => {
  let { page, limit } = data;
  return FosterCareModel.find()
    .skip((page - 1) * parseInt(limit))
    .limit(parseInt(limit));
};

let queryFosterCareOne = (id) => {
  return FosterCareModel.find({id})
};

module.exports = {
  addFosterCare,
  queryFosterCare,
  deleteFosterCare,
  updateFosterCare,
  queryFosterCareOne
};
