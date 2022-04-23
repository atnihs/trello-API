import { BoardService } from '*/services/board.service';
import { HttpStatusCode } from '*/utilities/constants';

const createNew = async (req, res) => {
  try {
    const result = await BoardService.createNew(req.body);
    console.log(result);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      erros: error.message,
    });
  }
};

export const BoardController = { createNew };
