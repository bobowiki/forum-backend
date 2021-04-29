const mongoose = require("./db")

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    validate: function(title) {
      return title.length <= 15
    }
  },
  description: {
    type: String,
    validate: function(title) {
      return title.length <= 30
    }
  },
  user_id: {
    type: Schema.Types.ObjectId
  },
  star: Number,
  zan: Number
})

module.exports = mongoose.model("Article",ArticleSchema,'articles')
