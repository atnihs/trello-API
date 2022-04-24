import { ObjectId } from 'mongodb';
import Joi from 'joi';
import { getDatabase } from '*/config/mongodb';

// define Board collection
const columnCollectionName = 'columns';
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(30).trim(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data);
    const insertValue = {
      ...validatedValue,
      boardId: ObjectId(validatedValue.boardId),
    };
    const result = await getDatabase()
      .collection(columnCollectionName)
      .insertOne(insertValue);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const pushCardOrder = async (columnId, cardId) => {
  try {
    const result = await getDatabase()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(columnId) },
        { $push: { cardOrder: cardId } },
        { returnDocument: 'after' }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    const result = await getDatabase()
      .collection(columnCollectionName)
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
    };
    if (data.boardId) updateData.boardId = ObjectId(data.boardId);
    const result = await getDatabase()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updateData },
        { returnDocument: 'after' }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const ColumnModel = {
  columnCollectionName,
  createNew,
  pushCardOrder,
  update,
  findOneById,
};
