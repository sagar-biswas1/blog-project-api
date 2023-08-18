const { model, Schema } = require("mongoose");

const ArticleSchema = new Schema(
  {
    title: "String",
    body: "String",
    cover: "String",
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "draft",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: "Comment",
    }],
  },
  {
    timestamps: true,
    id: true,
    strict:false,
  }
);

const Article = model("Article", ArticleSchema);

module.exports = Article;
