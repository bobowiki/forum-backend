const express = require("express")

const session = require("express-session")

const router = require("./routers/index")

const app = express()

app.use("/public", express.static("./public"))

var vertoken = require("./public/token/token")
var expressJwt = require('express-jwt')

// 配置解析表单一定要挂载之前
// bodyParser已经被弃用了可以直接使用express
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 配置中间件session
app.use(
  session({
    // 配置加密字符串,他会在原有加密基础上和这个字符串拼起来去加密
    // 目的是为了增加安全性,防止客户端恶意伪造
    secret: "itcast",
    resave: false,
    saveUninitialized: true, //无论你是否使用session,我都默认直接给你分配一把session
  })
)

//解析token获取用户信息
app.use(function (req, res, next) {
  var token = req.headers["authorization"]
  if (token == undefined) {
    return next()
  } else {
    vertoken
      .getToken(token)
      .then((data) => {
        req.data = data
        return next()
      })
      .catch((error) => {
        return next()
      })
  }
})

//验证token是否过期并规定那些路由不需要验证
app.use(
  expressJwt({
    secret: "zgs_first_token",
    algorithms: ["HS256"],
  }).unless({
    path: ["/login", "/register"], //不需要验证的接口名称
  })
)

//token失效返回信息
app.use(function (err, req, res, next) {
  if (err.status == 401) {
    return res.status(401).send("token失效")
    //可以设置返回json 形式  res.json({message:'token失效'})
  }
})

//解决跨域
app.use("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  )
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  if (req.method === "OPTIONS") {
    res.send(200)
  } else {
    next()
  }
})

// 使用路由
new router(app)

app.use(function (err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    msg: err,
  })
})

app.listen(5000, function () {
  console.log("forum-app is running on 5000 port")
})
