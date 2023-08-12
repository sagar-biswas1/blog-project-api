const defaults = require("../../config/defaults");
const { Article } = require("../../model");
var ObjectId = require("mongoose").Types.ObjectId;

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortType,
  search = defaults.search,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = {
    title: { $regex: search, $options: "i" },
  };

  const articles = await Article.find(filter)
    .populate({ path: "author", select: "name" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return articles.map((article) => ({ ...article._doc }));
};

const count = ({ search = defaults.search }) => {
  const filter = {
    title: { $regex: search, $options: "i" },
  };
  return Article.count(filter);
};

const create = async ({
  title,
  body = "",
  status = "draft",
  cover = "",
  author,
}) => {
  if (!title || !author) {
    const error = new Error("Invalid parameters");
    error.status = 400;
    throw error;
  }

  const article = new Article({
    title,
    body,
    status,
    cover,
    author: author.id,
  });

  await article.save();

  return article._doc;
};

const findByID = async ({ id, expand = "" }) => {
  if (!ObjectId.isValid(id)) {
    throw new Error(`You have passed invalid id ${id}`);
  }

  const itemToPopulate = expand.split(",").map((item) => item.trim());
  const article = await Article.findById(id);
  if (itemToPopulate.includes("author")) {
    console.log("hello")
    await article.populate({ path: "author", select: "name" });
  }

  if (itemToPopulate.includes("comments")) {
    await article.populate({
      path: "comments",
    });
  }

  return article._doc
};
module.exports = { findAll, create, count, findByID };
