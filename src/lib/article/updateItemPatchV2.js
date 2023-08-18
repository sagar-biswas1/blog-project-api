const { Article } = require("../../model");
const { notFound, bedRequest } = require("../../utils/error");

const restrictedPaths = ["id", "_id", "author"];
const updateProperties = async (id, operations = []) => {
  const article = await Article.findById(id);
  if (!article) {
    throw notFound();
  }

  for (const operation of operations) {
    const { op, path, value } = operation;
    if (restrictedPaths.includes(path)) {
      throw bedRequest(`invalid operation: ${path}`);
    }

    switch (op) {
      case "replace":
        article[path] = value;

        break;
      case "add":
        article.set(path, value);
        break;

      default:
        throw bedRequest(`invalid operation: ${op}`);
    }
  }
  article.save()
  return article._doc;
};

const replace = (document, path, value) => {
  document[path] = value;
};
module.exports = updateProperties;
