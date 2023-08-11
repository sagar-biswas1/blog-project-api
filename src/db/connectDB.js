const mongoose = require("mongoose");
require("dotenv").config();
/**
 * this function will return the connection url from env
 * @return string
 */

const generateConnectionString = () => {
  let connectionUrl = process.env.DB_CONNECTION_URL;
  const query = process.env.DB_URL_QUERY;
  const name = process.env.DB_NAME;
  // console.log({connectionUrl,query,name});
  //   return `${connectionUrl}/${name}?${query}`;
  return `${connectionUrl}`;
};

const connectDB = async () => {
  const url = generateConnectionString();
  const options = {
    autoIndex: false,
    dbName: process.env.DB_NAME,
  };
  // console.log({url})
  await mongoose.connect(url, { dbName: process.env.DB_NAME });

  console.log(`Connected to db`);
};


module.exports = connectDB;
