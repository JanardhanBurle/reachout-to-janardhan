const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

function validateRequest(data) {
  console.log(data);
  const schema = Joi.object().keys({
    _id: Joi.objectId(),
    fullName: Joi.string().min(1).max(100).required(),
    email: Joi.string().min(1).max(100).required().email(),
    message: Joi.string().min(1).max(500).required(),
  });
  console.log(Joi.validate(data, schema));
  return Joi.validate(data, schema);
}
exports.validateRequest = validateRequest;
