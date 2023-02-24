import { Router } from "express";
import { showAUser, showAllUsers, showAUserByToken, updateAUser, deleteAUser } from "../../controllers/userController/main.js";

const userRouter = Router();

userRouter.get('/:uid', showAUser);
userRouter.get('/token/:uid', showAUserByToken);
userRouter.get('/', showAllUsers);
userRouter.patch('/:uid', updateAUser);
userRouter.delete('/:uid', deleteAUser);

export default userRouter;