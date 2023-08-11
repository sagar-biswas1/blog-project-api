const defaults = require("../../../../config/defaults");
const articleService = require("../../../../lib/article");
const {
  transformData,
  getPagination,
  getHateAOS,
} = require("../../../../utils");

const findAll = async (req, res, next) => {
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;
  try {
    const articles = await articleService.findAll({
      page,
      limit,
      sortBy,
      sortType,
      search,
    });

    // const data = articles.map((article) => ({
    //   ...article._doc,
    //   link: `/articles/${article.id}`,
    // }));

    // console.log(articles._doc)
    // return res.json(articles[0]._id)
    const data = transformData(
      articles,
      ["_id", "title", "body", "updatedAt", "createdAt", "author", "cover"],
      { link: `/articles/{_id}` }
    );

    //pagination
    const totalItems = await articleService.count({ search });

    const pagination = getPagination({ totalItems, limit, page });

    //HATEOS links
    const links = getHateAOS({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });
    return res.status(200).json({ data, pagination, links });
  } catch (err) {
    next(err);
  }
};

module.exports = findAll;
