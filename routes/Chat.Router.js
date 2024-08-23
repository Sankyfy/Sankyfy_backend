import express from 'express';
import { createChat, deleteChat, getChatByUserAndShopkeeper, getChatsByShopkeeperId, getChatsByUserId, updateChat } from '../controllers/Chat.Controller.js';


const ChatRouter = express.Router();

ChatRouter.post('/', createChat);
ChatRouter.get('/shopkeeper/:shopkeeperId', getChatsByShopkeeperId);
ChatRouter.get('/chats/:userId/:shopkeeperId', getChatByUserAndShopkeeper);
ChatRouter.get('/user/:userId', getChatsByUserId);
ChatRouter.put('/:id', updateChat);
ChatRouter.delete('/:id', deleteChat);

export default ChatRouter;
