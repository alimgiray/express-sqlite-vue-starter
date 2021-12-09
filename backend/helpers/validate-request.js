const errors = require("../errors");

module.exports = validateRequest;

function validateRequest(req, res, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    const description = error.details.map((x) => x.message);
    const handledError = new errors.AppError(
      errors.errorTypes.NOT_VALID,
      400,
      description,
      true
    );
    next(handledError);
  } else {
    req.body = value;
    next();
  }
}
