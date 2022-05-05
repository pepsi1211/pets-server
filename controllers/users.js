var { Email, avatar } = require('../utils/config.js');
var { JWT } = require('../utils/config.js');
var UserModel = require('../models/users.js');
var fs = require('fs');
var url = require('url');
var { setCrypto, createVerify } = require('../utils/base.js');

// 登录接口
// var login = async (req, res, next) => {
//   var { username, password, verify } = req.body;

//   if (verify !== req.session.verifyImg) {
//     res.send({
//       msg: '验证码错误',
//       code: -3
//     })
//     return;
//   }

//   var result = await UserModel.findLogin({
//     username,
//     password: setCrypto(password)
//   });
//   // console.log(result);
//   if (result) {
//     req.session.username = username;
//     req.session.isAdmin = result.isAdmin;
//     req.session.avatar = result.avatar;
//     if (result.isFreeze) {
//       res.send({
//         msg: "帐号已冻结,请联系管理员",
//         code: -2
//       })
//     } else {
//       res.send({
//         msg: "登录成功",
//         code: 0
//       })
//     }
//   } else {
//     res.send({
//       msg: "登录失败",
//       code: -1
//     })
//   }
// }

// 登录接口
var login = async (req, res, next) => {
  const { username, password } = req.body;
  // if (verify !== req.session.verifyImg) {
  //   res.send({
  //     msg: '验证码错误',
  //     code: -3
  //   })
  //   return;
  // }

  var result = await UserModel.findLogin({
    username,
    password: setCrypto(password)
  });

  // 生成token
  var token = await JWT.generateToken({ username, password });

  if (result) {
    res.send({
      code: 200,
      data: {
        token,
        result
      },
      msg: '登录成功'
    })
  } else {
    res.send({
      code: 404,
      data: {},
      msg: '账号或密码错误'
    })
  }
}

// 注册接口
var register = async (req, res, next) => {
  const { username, password, phone } = req.body;

  var result = await UserModel.save({
    username,
    password: setCrypto(password),
    phone
  })

  if (result) {
    req.session.username = username;
    res.send({
      msg: "注册成功",
      code: 0
    })
  } else {
    res.send({
      msg: "注册失败",
      code: -2
    })
  }
}

// 发送验证码
var verify = async (req, res, next) => {
  var verify = Email.verify;
  var email = req.query.email;

  console.log(email, verify);

  req.session.verify = verify;
  req.session.email = email;
  req.session.time = Email.time;

  var mailOptions = {
    from: '"乐途👻" 715803334@qq.com',
    to: email,
    subject: "邮箱验证码",
    text: "验证码(30分钟内有效):" + verify
  };

  Email.transporter.sendMail(mailOptions, (err) => {
    if (err) {
      res.send({
        msg: "发送失败×",
        code: -1,
        err
      })
    } else {
      res.send({
        msg: "发送成功✔",
        code: 0
      })
    }
  });


}

// 注销接口
var logout = async (req, res, next) => {
  req.session.username = '';
  res.send({
    msg: "退出成功",
    code: 0
  });
};

// 检测用户是否登录
var getUser = async (req, res, next) => {
  if (req.session.username) {
    res.send({
      msg: "获取用户信息成功",
      code: 0,
      data: {
        username: req.session.username,
        isAdmin: req.session.isAdmin,
        avatar: req.session.avatar
      }
    })
  } else {
    res.send({
      msg: '获取用户信息失败',
      code: -1
    })
  }
}

// 忘记密码
var findPassword = async (req, res, next) => {
  var { email, password, verify } = req.body;
  if (email === req.session.email && verify === req.session.verify) {
    var result = await UserModel.updatePassword(email, setCrypto(password));
    if (result) {
      res.send({
        msg: '修改成功',
        code: 0
      })
    } else {
      res.send({
        msg: '修改失败',
        code: -2
      })
    }
  } else {
    res.send({
      msg: '邮箱或验证码错误',
      code: -1
    })
  }
}

// 生成验证码图片
var verifyImg = async (req, res) => {
  var result = await createVerify(req);
  if (result.buffer) {
    res.send(result.buffer);
  }
}

var uploadAvatar = async (req, res) => {
  console.log(req.file);
  await fs.rename(`public/uploads/${req.file.filename}`, `public/uploads/${req.session.username}.jpg`, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });

  var result = await UserModel.updateAvatar(req.session.username, url.resolve(avatar.baseUrl, `${req.session.username}.jpg`));

  if (result) {
    res.send({
      msg: '头像修改成功',
      code: 0,
      data: {
        avatar: url.resolve(avatar.baseUrl, `${req.session.username}.jpg`)
      }
    })
  } else {
    res.send({
      msg: "头像修改失败",
      code: -1
    })
  }
}

module.exports = {
  login,
  register,
  verify,
  logout,
  getUser,
  findPassword,
  verifyImg,
  uploadAvatar
}