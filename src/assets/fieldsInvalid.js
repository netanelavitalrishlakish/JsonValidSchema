function fieldsInvalid(textJson, textSchema) 
{
  debugger;
  let Ajv = require("ajv");
  let ajv = new Ajv({ allErrors: true });
  let schema = JSON.parse(textSchema);
  let json = JSON.parse(textJson);
  let valid = ajv.validate(schema, json);
  console.log(valid);
    if (valid) 
  {
    return "Valid";
  } 
  else 
  {
    let invalidFields = Object.keys(json).filter(field => {
      if (!schema.properties.hasOwnProperty(field)) {
        return true;
      } else {
        let propertySchema = schema.properties[field];
        let propertyValue = json[field];
        return !ajv.validate(propertySchema, propertyValue);
      }
    });

    let invalidMessage =  JSON.stringify(invalidFields);
    console.log(invalidMessage);
    return invalidMessage;
  }
}

module.exports = fieldsInvalid;
