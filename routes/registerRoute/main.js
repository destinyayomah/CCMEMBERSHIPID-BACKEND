import { Router } from "express";
import registerUser from "../../controllers/registerController.php/main.js";

const registerRouter = Router();

registerRouter.post('/', registerUser);

export default registerRouter;