var { JWT } = require('../utils/config.js');
var AdminModel = require('../models/admin');
var { setCrypto, clone } = require('../utils/base.js');

// 登录接口
var getToken = async (req, res, next) => {
	const { username, password } = req.body;

	var result = await AdminModel.getToken({
		username,
		password: setCrypto(password)
	});

	// 生成token
	var token = await JWT.generateToken({ username, password });

	if (result) {
		res.send({
			code: 200,
			data: {
				token
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
	const { username, password } = req.body;

	var result = await AdminModel.save({
		username,
		password: setCrypto(password),
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

let getUserInfo = async (req, res) => {
	var decoded = JWT.verifyToken(req.headers.authorization);
	if (!decoded.username) {
		res.send({
			code: 404,
			msg: 'token验证不通过'
		})
		return;
	}
	let result = await AdminModel.getUserInfo(decoded.username);
	res.send({
		code: 200,
		data: result[0],
		msg: 'true'
	})
}

module.exports = {
	getToken,
	register,
	getUserInfo
}