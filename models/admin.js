let mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  avatar: { type: String, default: 'http://47.106.185.150/default.jpg' }
})


let AdminModel = mongoose.model('admin', AdminSchema);
AdminModel.createIndexes();

let save = (data) => {
  let user = new AdminModel(data);
  return user.save()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

let getToken = (data) => {
  return AdminModel.findOne(data);
}


let usersList = () => {
  return AdminModel.find();
}

let getUserInfo = (username) => {
  return AdminModel.find({ username })
}

module.exports = {
  save,
  usersList,
  getToken,
  getUserInfo
}