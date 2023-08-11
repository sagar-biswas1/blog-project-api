const { Article } = require("../../model");

const findAll =  ({
  page = 1,
  limit = 10,
  sortType = "dsc",
  sortBy = "updatedAt",
  search = "",
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = {
    title: { $regex: search, $options: "i" },
  };
  const articles =  Article.find(filter)
    .populate({ path: "author", select: "name" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);
  
 
  return articles;
};


const count = ({search=""})=>{
  const filter = {
    title: { $regex: search, $options: "i" },
  };
  return Article.count(filter);
}


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

  return article.save();
};
module.exports = { findAll, create ,count};
