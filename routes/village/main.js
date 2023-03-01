import { createVillage, getAVillage, getAllVillage, updateAVillage, deleteAVillage, deleteMultipleVillage } from "../../controllers/village/main.js";
import { Router } from "express";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

const villageRouter = Router();

villageRouter
    .get('/:id', getAVillage)
    .get('/', getAllVillage)
    .post('/', createVillage)
    .patch('/:id', updateAVillage)
    .delete('/multiple', jsonParser, deleteMultipleVillage)
    .delete('/:id', deleteAVillage);

export default villageRouter;
