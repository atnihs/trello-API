import express from 'express';
import { HttpStatusCode } from '*/utilities/constants';
import { boardRoutes } from './board.route';

const router = express.Router();

// GET /v1/status
router.get('/status', (req, res) =>
  res.status(HttpStatusCode.OK).json({
    status: 'OK',
  })
);

router.use('/boards', boardRoutes);

// BOARD API

export const apiV1 = router;
