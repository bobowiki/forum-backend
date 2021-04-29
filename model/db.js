const mongoose = require("mongoose")

// 连接数据库
mongoose.connect(
  "mongodb://localhost:27017/forum",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, data) => {
    if (err) {
      return console.log(err)
    }
    console.log("数据库连接成功")
  }
)

module.exports = mongoose
