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
  },
  {
    timestamps: true,
    id: true,
  }
);

const Article = model("Article", ArticleSchema);

module.exports = Article;
