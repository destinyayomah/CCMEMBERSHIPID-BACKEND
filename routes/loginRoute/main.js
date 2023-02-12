import { Router } from 'express';
import login from '../../controllers/loginController/main.js';

const loginRouter = Router();

loginRouter.post('/', login);

export default loginRouter;