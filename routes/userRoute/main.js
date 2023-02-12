import { Router } from "express";
import { showAUser, showAllUsers, updateAUser, deleteAUser } from "../../controllers/userController/main.js";

const userRouter = Router();

userRouter.get('/:uid', showAUser);
userRouter.get('/', showAllUsers);
userRouter.patch('/:uid', updateAUser);
userRouter.delete('/:uid', deleteAUser);

export default userRouter;