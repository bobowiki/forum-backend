const express = require('express')

const register = express.Router();
const UserModel = require('../model/user')

register.post('/register',function(req,res,next) {
  const params = req.query
  UserModel.findOne({
    studentCode: params.studentCode
  }, function(err,user) {
    if(err) {
      return next(err)
    }
    if(user) {
      return res.status(200).json({
        err_code: 1,
        msg: "该用户已存在"
      })
    }
    new UserModel(req.query).save(function(err,user) {
      if (err) {
        return next(err);
      }
      req.session.user = user
      res.status(200).json({
        err_code: 0,
        msg: "注册成功"
      })
    })
  })
})

module.exports = register