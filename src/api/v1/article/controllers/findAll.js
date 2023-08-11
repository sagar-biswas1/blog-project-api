const articleService = require("../../../../lib/article");
const { transformData } = require("../../../../utils");

const generateQueryString = (queryObj) => {
  return Object.keys(queryObj)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryObj[key])
    )
    .join("&");
};

const findAll = async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sortType = req.query.sort_type || "dsc";
  const sortBy = req.query.sort_by || "updatedAt";
  const search = req.query.search || "";

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
    const totalArticles = await articleService.count({ search });
    const totalPage = Math.ceil(totalArticles / limit);

    const pagination = {
      page,
      limit,
      totalItems: totalArticles,
      totalPage,
    };

    if (page < totalPage) {
      pagination.next = page + 1;
    }

    if (page > 1) {
      pagination.prev = page - 1;
    }
    //HATEOS links

    const links = {
      self: req.url,
    };

    if (pagination.next) {
      const queryStr = generateQueryString({ ...req.query, page: page + 1 });
      links.next = `${req.path}?${queryStr}`;
    }
    if (pagination.prev) {
      const queryStr = generateQueryString({ ...req.query, page: page - 1 });
      links.prev = `${req.path}?${queryStr}`;
    }

    return res.status(200).json({ data, pagination, links });
  } catch (err) {
    next(err);
  }
};

module.exports = findAll;
