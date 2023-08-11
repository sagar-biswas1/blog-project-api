const generateQueryString = (queryObj) => {
  console.log(queryObj)
    return Object.keys(queryObj)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryObj[key])
      )
      .join("&");
  };


  module.exports =
    generateQueryString