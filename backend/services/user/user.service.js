const bcrypt = require("bcryptjs");

const jwt = require("../../helpers/jwt");
const errors = require("../../errors");

const User = require("./user.model");

module.exports = {
  register,
  login,
};

async function register(username, password, email) {
  const hash = await bcrypt.hash(password, 10);
  let user = null;
  try {
    user = await User.create({ username, password: hash, email });
    await user.save();
  } catch (err) {
    if (err.name.includes("UniqueConstraintError")) {
      throw new errors.AppError(
        errors.errorTypes.NOT_VALID,
        400,
        "Username or email already exists",
        true
      );
    } else {
      throw err;
    }
  }
  return { token: jwt.sign({ id: user.id }), username: username };
}

async function login(email, password) {
  const user = await User.findOne({ where: { email: email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    return { token: jwt.sign({ id: user.id }), username: user.username };
  }
  throw new errors.AppError(
    errors.errorTypes.NOT_AUTHORIZED,
    401,
    "Invalid email or password",
    true
  );
}
