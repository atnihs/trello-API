import Joi from 'joi';
import { getDatabase } from '*/config/mongodb';

// define Board collection
const cardCollectionName = 'cards';
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(30),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDatabase()
      .collection(cardCollectionName)
      .insertOne(value);

    // console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const CardModel = { createNew, validateSchema };
