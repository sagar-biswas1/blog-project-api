const articleService = require("../../../../lib/article");

const findByID = async (req, res, next) => {
  const expand = req.query.expand || "";
  const id = req.params.id;

  try {
    const article = await articleService.findByID({ id, expand });
    const response = {
        data: article,
        "links": {
            "self": `/articles/${article._id}`,
            "author": `/articles/${article._id}/author`,
            "comments": `/articles/${article._id}/comments`
          }
    }
    res.status(200).json(response)
  } catch (err) {
    next(err);
  }
};

module.exports = findByID;
