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

    res.status(201).json(article);
  } catch (err) {
    next(err);
  }
};

module.exports = create;
