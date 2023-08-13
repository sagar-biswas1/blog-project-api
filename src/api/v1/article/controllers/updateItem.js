const articleService = require("../../../../lib/article");

const updateItem = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body.body || "";
  const title = req.body.title || "";
  const status = req.body.status || "draft";
  const cover = req.body.cover || "";
  const author = req.user;
  try {
    const { article, status:statusCode } = await articleService.updateOrCreate(id, {
      body,
      title,
      status,
      cover,
      author,
    });
    
    console.log("hello",article,statusCode);
    const response = {
      code: statusCode,
      message:
      statusCode === 201
          ? "Successfully created article"
          : "Updated article successfully",
      data: article,
      links: {
        self: `/articles/${article.id}`,
      },
    };
    res.status(statusCode).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = updateItem;
