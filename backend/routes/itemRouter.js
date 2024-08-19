import { getItems, createItem } from '../controllers/itemController.js'
import { Router } from 'express';

const itemRouter = Router()

itemRouter.get('/item',getItems);
itemRouter.post('/item',createItem);

export default itemRouter;
