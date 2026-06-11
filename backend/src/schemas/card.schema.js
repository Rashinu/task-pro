import Joi from "joi";

const priorities = ["without", "low", "medium", "high"];

export const createCardSchema = Joi.object({
  title: Joi.string().min(1).max(120).required().messages({
    "string.empty": "Title is required",
  }),
  description: Joi.string().min(1).max(2000).required().messages({
    "string.empty": "Description is required",
  }),
  priority: Joi.string().valid(...priorities),
  deadline: Joi.date().required().messages({
    "any.required": "Deadline is required",
    "date.base": "Deadline must be a valid date",
  }),
});

export const updateCardSchema = Joi.object({
  title: Joi.string().min(1).max(120),
  description: Joi.string().min(1).max(2000),
  priority: Joi.string().valid(...priorities),
  deadline: Joi.date(),
}).min(1);

export const moveCardSchema = Joi.object({
  columnId: Joi.string().hex().length(24).required(),
});
