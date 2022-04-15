const crypto = require('crypto');
const captcha = require('trek-captcha');

var setCrypto = (info) => {
  return crypto.createHmac('sha256', '^%$^%$^%$')
    .update(info)
    .digest('hex');
};



var createVerify = (req) => {
  return captcha().then((info) => {
    req.session.verifyImg = info.token;
    console.log(req.session, info.token);
    return {
      buffer: info.buffer,
      token: info.token
    };
  }).catch(() => {
    return false;
  });
};

let clone = (target) => {
  let cloneTarget = {};
  for (const key in target) { // 通过for in 遍历被克隆对象属性
      cloneTarget[key] = target[key];
  }
  return cloneTarget;
};

let parseTime = (time, cFormat) => {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    return value.toString().padStart(2, '0');
  });
  return time_str;
}

module.exports = {
  setCrypto,
  createVerify,
  clone,
  parseTime
}