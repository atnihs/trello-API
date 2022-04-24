import Joi from 'joi';
import { getDatabase } from '*/config/mongodb';
import { ObjectId } from 'mongodb';

// define Board collection
const cardCollectionName = 'cards';
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(30).trim(),
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

const findOneById = async (id) => {
  try {
    const result = await getDatabase()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data);
    const insertValue = {
      ...validatedValue,
      boardId: ObjectId(validatedValue.boardId),
      columnId: ObjectId(validatedValue.columnId),
    };
    const result = await getDatabase()
      .collection(cardCollectionName)
      .insertOne(insertValue);
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
    if (data.columnId) updateData.columnId = ObjectId(data.columnId);

    const result = await getDatabase()
      .collection(cardCollectionName)
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

const deleteMany = async (ids) => {
  try {
    const transformIds = ids.map((id) => ObjectId(id));
    const result = await getDatabase()
      .collection(cardCollectionName)
      .updateMany(
        {
          _id: { $in: transformIds },
        },
        {
          $set: { _destroy: true },
        }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardModel = {
  cardCollectionName,
  createNew,
  findOneById,
  deleteMany,
  update,
};
