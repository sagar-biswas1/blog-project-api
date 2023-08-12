const articleService = require("../../../../lib/article");
const create = async (req, res, next) => {
  const { title, body, status, cover } = req.body;
  try {
    const article = await articleService.create({
      title,
      body,
      status,
      cover,
      author: req.user,
    });
const response= {
  code:201,
  message: "Article created successfully",
  data: article,
  "links": {
    "self": `/articles/${article._id}`,
    "author": `/articles/${article._id}/author`,
    "comments": `/articles/${article._id}/comments`
  }
}
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = create;
