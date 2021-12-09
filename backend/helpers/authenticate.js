const jwt = require("./jwt");
const errors = require("../errors");

authenticate = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    throw new errors.AppError(
      errors.errorTypes.NOT_AUTHORIZED,
      400,
      "Authorization header not present",
      true
    );
  }
  const token = header.split(" ")[1];
  if (!token) {
    throw new errors.AppError(
      errors.errorTypes.NOT_AUTHORIZED,
      400,
      "Token not found",
      true
    );
  }
  const user = jwt.verify(token);
  if (!user) {
    throw new errors.AppError(
      errors.errorTypes.NOT_AUTHORIZED,
      400,
      "Token expired",
      true
    );
  }
  req.user = user;
  next();
};

module.exports = authenticate;
