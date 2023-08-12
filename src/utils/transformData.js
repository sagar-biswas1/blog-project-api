function transformData(inputArray = [], propertiesToAccess = [], customProperties = {}) {
  if(!Array.isArray(inputArray) || !Array.isArray(propertiesToAccess) ){
    throw new Error("You must pass array as propertiesToAccess and propertiesToAccess value")
  }
  

  //validation to be improved
  return inputArray.map((obj) => {
      const selectedProperties = {};
  
      propertiesToAccess.forEach((property) => {
        if (obj[property]) {
          selectedProperties[property] = obj[property];
        }
      });
      if(typeof customProperties === 'object'){
        for (const property in customProperties) {
          const valueToBeReplaced = customProperties[property].match(/{(.*?)}/)[1];
          console.log({valueToBeReplaced})
          if( ! selectedProperties[valueToBeReplaced]){
            throw new Error(`key ${valueToBeReplaced} is not available in ${JSON.stringify(selectedProperties)} . Dynamic link can't be formed`)
          }
          selectedProperties[property] = customProperties[property].replace(
            `{${valueToBeReplaced}}`,
            selectedProperties[valueToBeReplaced]
          );
        }
      }
  
      return selectedProperties;
    });
  }

  module.exports = transformData