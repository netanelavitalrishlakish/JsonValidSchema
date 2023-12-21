window.defaultError = function(textJson, textSchema) {
    debugger;
    let Ajv = require("ajv");
    let ajv = new Ajv({ allErrors: true });
    let schema = JSON.parse(textSchema);
    let json = JSON.parse(textJson);
    let valid = ajv.validate(schema, json);
  
    if (valid) {
      valid = "Valid";
      console.log(valid);
      console.log("textJson: ", json);
      console.log("textSchema: ", schema);
    } else {
      valid =  ajv.errorsText(ajv.errors);
      console.log(valid);
    }
    return valid;
  };

  module.exports = defaultError;