import { createEvent, createTicketTier } from '@/controllers/event.controller';
import { Router } from 'express';

const eventRouter = Router();

eventRouter.get('/');
eventRouter.post('/create', createEvent);
eventRouter.patch('/update/:id');
eventRouter.delete('/delete/:id');
eventRouter.post('/:eventId', createTicketTier);

export default eventRouter;
