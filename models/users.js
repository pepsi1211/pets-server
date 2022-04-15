let mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let UserSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  phone: { type: String, require: true },
  date: { type: Date, default: Date.now() },
  avatar: { type: String, default: 'http://47.106.185.150/default.jpg' }
})


let UserModel = mongoose.model('user', UserSchema);
UserModel.createIndexes();

let save = (data) => {
  let user = new UserModel(data);
  return user.save()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

let findLogin = (data) => {
  return UserModel.findOne(data);
}

let updatePassword = (email, password) => {
  return UserModel.update({ email }, { $set: { password } })
    .then(() => { return true })
    .catch(() => { return false })
}

let usersList = () => {
  return UserModel.find();
}

let updateFreeze = (email, isFreeze) => {
  return UserModel.update({ email }, { $set: { isFreeze } })
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

let deleteUser = (email) => {
  return UserModel.deleteOne({ email });
}


let updateAvatar = (username,avatar)=>{
  return UserModel.update({ username }, { $set: { avatar } })
  .then(() => {
    return true
  })
  .catch(() => {
    return false
  })
}








module.exports = {
  save,
  findLogin,
  updatePassword,
  usersList,
  updateFreeze,
  deleteUser,
  updateAvatar
}