const transformData = require("./transformData.js");
const generateQueryString = require("./qs");
const {getPagination,getHateAOS} = require("./query.js");
module.exports = {
  transformData,
  generateQueryString,
  getPagination,
  getHateAOS
};
