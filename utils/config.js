var mongoose = require('mongoose');
var nodemailer = require('nodemailer')
var jwt = require('jsonwebtoken');

var Mongoose = {
  url: 'mongodb://localhost:27017/game',
  connect() {
    mongoose.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
      if (err) {
        console.log('数据库连接失败');
        return;
      }
      console.log('数据库连接成功')
    })
  }
}

var Email = {
  config: {
    host: "smtp.qq.com",
    port: 587,
    auth: {
      user: '715803334@qq.com',
      pass: 'wnjmikqqlvuxbdcb'
    }
  },
  get transporter() {
    return nodemailer.createTransport(this.config);
  },
  get verify() {
    return Math.random().toString().substring(2, 8);
  },
  get time() {
    return Date.now();
  }
}

var avatar = {
  baseUrl: 'http://49.233.128.141:3000/uploads/'
}

const JWT = {
  // 生成token
  generateToken(info) {
    let data = info;
    let token = jwt.sign(data, 'pepsi', {
      expiresIn: '2d',
      issuer: 'HONG'
    });
    return token;
  },
  // 验证token
  verifyToken(token) {
    var outerDecoded = {};
    jwt.verify(token, 'pepsi', (err, decoded)=>{
      if(err){
        // 如果token过期就会执行err代码块
        return err;
      }else{
        outerDecoded = decoded;
      }
    })
    return outerDecoded;
  }
}


module.exports = {
  Mongoose,
  Email,
  avatar,
  JWT
}