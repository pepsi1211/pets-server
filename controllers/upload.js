let FileModel = require("../models/upload");
let { parseTime } = require("../utils/base");
const fs = require("fs");

// 增
let addOrUpdateFile = async (req, res) => {
  // const { uuid } = req.body;
  let file = req.file;
  let type = file.originalname.substring(file.originalname.length - 3);
  let rename = `${parseTime(new Date(), "{y}-{m}-{d}")}-${
    Math.floor(Math.random() * (1000 - 9999 + 1)) + 9999
  }.${type}`;
  await fs.rename(
    `public/uploads/${req.file.filename}`,
    "public/uploads/" + rename,
    (err) => {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );

  // var result = await FileModel.addOrUpdateFile([
  //   { url: `http://47.106.185.150/uploads/${rename}` },
  // ]);

  res.send({
    code: 200,
    data: [{ url: `http://47.106.185.150/uploads/${rename}` }],
    msg: "true",
  });
};

// let queryFile = async(req, res)=>{
//   const { uuid } = req.body;
//   let result = await FileModel.queryFile(uuid);
//   if(result){
//     res.send({
//       code: 200,
//       data: result,
//       msg: true
//     })
//   }else{
//     res.send({
//       code: 404,
//       msg: false
//     })
//   }
// }

module.exports = {
  addOrUpdateFile,
  // queryFile
};
