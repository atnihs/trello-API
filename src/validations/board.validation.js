import Joi from 'joi';
import { HttpStatusCode } from '*/utilities/constants';

const createNew = async (req, res, next) => {
  const condition = Joi.object({
    title: Joi.string().required().min(3).max(30),
  });
  try {
    await condition.validateAsync(req.body, { abortEarly: false });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      erros: new Error(error).message,
    });
  }
  next();
};

export const BoardValidation = { createNew };
