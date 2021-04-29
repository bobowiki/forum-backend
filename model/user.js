const mongoose = require("./db")

const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  studentCode: {
    type: Number,
    required: true,
    unique: true,
    validate: function (studentCode) {
      return (studentCode + '').length === 10
    },
  },
  password: {
    type: String,
    required: true,
  },
  created_time: {
    type: Date,
    // 注意：这里不要写 Date.now() 因为会即刻调用
    // 这里直接给了一个方法：Date.now
    // 当你去new Model的时候，如果没有传递create_time,则mongoose就会调用default 指定的Date.now方法，使用其返回值作为默认值
    default: Date.now,
  },
  last_modified_time: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
    default: "/public/img/boy.png",
  },
  bio: {
    type: String,
    default: "他什么都没说",
  },
  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1,
  },
  birthday: {
    type: Date,
  },
  status: {
    type: Number,
    // 0 没有权限限制 1 不可以评论 2 不可以登录
    // 是否可以评论
    // 是否可以登录使用
    enum: [0, 1, 2],
    default: 0,
  },
})

module.exports = mongoose.model("User", UserSchema,"users")
