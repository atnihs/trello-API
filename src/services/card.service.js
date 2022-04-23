import { CardModel } from '*/models/card.model';
import { ColumnModel } from '*/models/column.model';

const createNew = async (data) => {
  try {
    const createCard = await CardModel.createNew(data);
    const getNewCard = await CardModel.findOneById(
      createCard.insertedId.toString()
    );

    await ColumnModel.pushCardOrder(
      getNewCard.columnId.toString(),
      getNewCard._id.toString()
    );

    return getNewCard;
  } catch (error) {
    throw new Error(error);
  }
};

export const CardService = { createNew };
