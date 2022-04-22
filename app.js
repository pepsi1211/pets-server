var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var session = require("express-session");
var UserModel = require("./models/users");
var AdminModel = require("./models/admin");
let { parseTime } = require("./utils/base");

var { Mongoose, JWT } = require("./utils/config");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin");
var uploadRouter = require("./routes/upload");
var categoryRouter = require("./routes/category");
var productRouter = require("./routes/product");
var fosterCareClientRouter = require("./routes/fosterCareClient");
var fosterCareServerRouter = require("./routes/fosterCareServer");
var walkServerRouter = require("./routes/walkServer");
var walkClientRouter = require("./routes/walkClient");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "keyboard cat",
    name: "sessionId",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.all("/*", (req, res, next) => {
  console.log("触发了app.all, 通过的url为:", req.url, parseTime(new Date()));
  // 普通路由 无需验证权限
  let constantRouter = [
    "/api/users/register",
    "/api/users/login",
    "/api/users/verifyImg",
    "/api/admin/getToken",
    "/api/admin/register",
    "/api/client/addFosterCare",
    "/api/client/queryFosterCare",
  ];
  if (constantRouter.includes(req.url)) {
    // 如果是注册或者登陆 直接通过,不验证token
    next();
  } else {
    var token = req.headers.authorization;
    var decoded = JWT.verifyToken(token);
    if (!decoded.username) {
      res.send({
        status: 404,
        msg: "token验证不通过",
      });
      return;
    }
    const { username } = decoded;
    var result;
    if (req.url.split("/")[2] == "admin") {
      result = AdminModel.getToken({ username });
    } else {
      result = UserModel.findLogin({ username });
    }
    result.select("username").exec(function (err, res) {
      if (err) {
        return false;
      } else {
        // verifyRes = res;
        if (res.username == username) {
          next();
        } else {
          res.send({
            status: 404,
            msg: "无法验证token,可能已过期",
          });
        }
      }
    });
  }
});
app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/admin", adminRouter);
app.use("/api/admin", categoryRouter);
app.use("/api/admin", uploadRouter);
app.use("/api/admin", productRouter);
app.use("/api/client", fosterCareClientRouter);
app.use("/api/admin", fosterCareServerRouter);
app.use("/api/admin", walkServerRouter);
app.use("/api/client", walkClientRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

Mongoose.connect();

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
