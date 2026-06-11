import { HttpError } from "../utils/HttpError.js";

export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return next(new HttpError(400, error.message));
    }
    req.body = value;
    next();
  };
};
