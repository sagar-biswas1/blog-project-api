function transformData(inputArray = [], propertiesToAccess = [], customProperties = {}) {
    return inputArray.map((obj) => {
      const selectedProperties = {};
  
      propertiesToAccess.forEach((property) => {
        if (obj[property]) {
          selectedProperties[property] = obj[property];
        }
      });
  
      for (const property in customProperties) {
        const valueToBeReplaced = customProperties[property].match(/{(.*?)}/)[1];
        console.log({valueToBeReplaced})
        selectedProperties[property] = customProperties[property].replace(
          `{${valueToBeReplaced}}`,
          selectedProperties[valueToBeReplaced]
        );
      }
  
      return selectedProperties;
    });
  }

  module.exports = transformData