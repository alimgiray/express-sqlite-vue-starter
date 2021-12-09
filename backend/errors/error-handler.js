module.exports = errorHandler;

async function handleError(error, res) {
  // If it's not an operational error, fail immediately after sending response
  // This way application won't be staying on an unknown state
  // It's going to restart
  console.log(error);
  if (!error.isOperational) {
    if (res) {
      res.status(500).json({
        name: "unknown-error",
        description: "We don't know what happened, but something is wrong.",
      });
    }
    process.exit(1);
  }
  res.status(error.httpCode).json(error);
}

async function errorHandler(err, req, res, next) {
  // Maybe also log the request & it's parameters ??
  await handleError(err, res);
}

process.on("uncaughtException", (error) => {
  handleError(error);
});

process.on("unhandledRejection", (reason) => {
  handleError(reason);
});
