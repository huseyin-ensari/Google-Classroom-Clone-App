const CustomError = require("../../helpers/errors/CustomError");

const customErrorHandler = (err, req, res) => {
  let tempError = err;

  return res.status(tempError.status || 500).json({
    success: false,
    message: tempError.message,
  });
};

module.exports = customErrorHandler;
