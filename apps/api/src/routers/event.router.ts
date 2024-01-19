import { Router } from "express";

const eventRouter = Router();

eventRouter.get('/');
eventRouter.post('/create');
eventRouter.patch('/update/:id');
eventRouter.delete('/delete/:id');

export default eventRouter;