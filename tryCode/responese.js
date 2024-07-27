const response = (statusCode, data, message, res, prev, next, total) => {
  res.status(statusCode).json({
    payload: {
      statusCode: statusCode,
      datas: data,
      message: message,
    },
    pagination: {
      prev: prev,
      next: next,
      total: total,
    },
  });
};

module.exports = response;
