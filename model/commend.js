const mongoose = require("./db")

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  article_id: {
    type: Schema.Types.ObjectId,
  },
  content: String,
  user_id: {
    type: Schema.Types.ObjectId,
  },
})

module.exports = mongoose.model("Commend", CommentSchema, "commends")
