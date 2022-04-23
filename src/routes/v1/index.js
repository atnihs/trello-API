import express from 'express';
import { HttpStatusCode } from '*/utilities/constants';
import { boardRoutes } from './board.route';
import { columnRoutes } from './column.route';
import { cardRoutes } from './card.route';

const router = express.Router();

// GET /v1/status
router.get('/status', (req, res) =>
  res.status(HttpStatusCode.OK).json({
    status: 'OK',
  })
);

// BOARD APIs
router.use('/boards', boardRoutes);

// COLUMN APIs
router.use('/columns', columnRoutes);

// CARD APIs
router.use('/cards', cardRoutes);

export const apiV1 = router;
