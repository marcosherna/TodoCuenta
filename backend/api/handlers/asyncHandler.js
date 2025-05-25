export const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

export const asyncHandlerWithResponse = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next))
    .then((result) => {
      if (result === undefined) {
        if (req.method === "DELETE" || req.method === "PUT") {
          return res.status(204).send();
        }
        return res.status(200).send();
      }

      let statusCode = 200;
      let responseData = result;

      if (
        typeof result === "object" &&
        result !== null &&
        "status" in result &&
        "data" in result
      ) {
        statusCode = result.status;
        responseData = result.data;
      } else if (req.method === "POST") {
        statusCode = 201;
      }

      if (statusCode === 204) {
        res.status(204).send();
      } else {
        res.status(statusCode).json(responseData);
      }
    })
    .catch(next);
};
