let mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let FileSchema = new mongoose.Schema({
  imgList: [{ url: String }],
  uuid: { type: String, require: true, index: { unique: true } }
})


let FileModel = mongoose.model('upload', FileSchema);
FileModel.createIndexes();

let addOrUpdateFile = (uuid, imgList) => {
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
  console.log('进来了', uuid, imgList);
  let params = new FileModel({ uuid, imgList });
  return params.save()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
  // }
}

let queryFile = (uuid)=>{
  console.log(uuid);
  return FileModel.findOne({uuid})
}

module.exports = {
  addOrUpdateFile,
  queryFile
}