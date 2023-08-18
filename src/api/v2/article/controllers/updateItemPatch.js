const updateProperties = require("../../../../lib/article/updateItemPatchV2");

const updateItemPatch = async (req, res, next) => {
  const { id } = req.params;
  try {
     const  article  = await updateProperties(id, req.body);
    
    const response = {
      code: 200,
      message:"Updated article successfully",
      data: article,
      links: {
        self: `/articles/${article.id}`,
      },
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = updateItemPatch;
