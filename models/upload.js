let mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let FileSchema = new mongoose.Schema({
  imgList: [{ url: String }],
  timeStamp: {type: Date, default: new Date().getTime()}
  // uuid: { type: String, require: true, index: { unique: true } }
})


let FileModel = mongoose.model('upload', FileSchema);
FileModel.createIndexes();

let addOrUpdateFile = (imgList) => {
  // console.log(FileModel.findOne({ uuid }));
  // if (FileModel.findOne({ uuid })) {
  //   return FileModel.updateOne({ uuid }, { imgList })
  //     .then(() => {
  //       return true
  //     })
  //     .catch(() => {
  //       return false
  //     })
  // } else {
  let params = new FileModel({ imgList });
  return params.save()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
  // }
}

let queryFile = (imgList)=>{
  return FileModel.findOne({imgList})
}

module.exports = {
  addOrUpdateFile,
  queryFile
}