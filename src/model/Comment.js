const { model, Schema } = require("mongoose");

const CommentSchema = new Schema(
  {
    body: "String",

    status: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
  },
  {
    timestamps: true,
    id: true,
  }
);

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
