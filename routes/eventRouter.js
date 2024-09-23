import express from 'express';

import {
  getEvents,
  registerForEvent,
  getEventParticipants,
  createEvent,
  getOneEvent,
} from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getOneEvent);
router.get('/:id/participants', getEventParticipants);
router.post('/:id', registerForEvent);
router.post('/', createEvent);

export default router;
