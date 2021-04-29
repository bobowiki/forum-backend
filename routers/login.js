const express = require("express")

const User = require("../model/user")

const login = express.Router()

var vertoken = require("../public/token/token")

login.post("/login", function (req, res) {
  // 做配置让postman和vue都能进行接口访问
  // 这里有个坑在vue中我们可以直接req.body得到axios中的请求数据，但是在postman我们又必须通过req.query才能得到
  console.log(req.body);
  const body = JSON.stringify(req.query) == "{}" ? req.body : req.query
  User.findOne(
    {
      studentCode: body.studentCode,
    },
    function (err, user) {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.status(200).json({
          err_code: 1,
          msg: "该用户不存在",
        })
      } else {
        if (user.password !== body.password) {
          return res.status(200).json({
            err_code: 1,
            msg: "密码错误",
          })
        }
        req.session.user = user
        vertoken.setToken(body.studentCode, user._id).then((token) => {
          return res.status(200).json({
            err_code: 0,
            msg: "登录成功",
            token: token,
          })
        })
      }
    }
  )
})

module.exports = login
