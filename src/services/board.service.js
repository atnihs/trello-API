import { BoardModel } from '*/models/board.model';
import { cloneDeep } from 'lodash';

const createNew = async (data) => {
  try {
    const createdBoard = await BoardModel.createNew(data);
    const getNewBoard = await BoardModel.findOneById(
      createdBoard.insertedId.toString()
    );

    return getNewBoard;
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId);

    if (!board || !board.columns) throw new Error('Board not found!');

    const transformBoard = cloneDeep(board);
    // Filter deleted columns
    transformBoard.columns = transformBoard.columns.filter(
      (column) => !column._destroy
    );

    // add Card to each Column
    transformBoard.columns.forEach((column) => {
      column.cards = transformBoard.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      );
    });

    // remove Cards data from Board
    delete transformBoard.cards;

    return transformBoard;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updatedAt: Date.now(),
    };
    if (updateData._id) delete updateData._id;
    if (updateData.columns) delete updateData.columns;

    const updatedBoard = await BoardModel.update(id, updateData);

    return updatedBoard;
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardService = { createNew, getFullBoard, update };
