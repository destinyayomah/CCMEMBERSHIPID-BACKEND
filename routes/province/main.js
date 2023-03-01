import { createProvince, getAProvince, getAllProvince, deleteAProvince, deleteMultipleProvince, updateAProvince } from "../../controllers/province/main.js";
import { Router } from "express";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

const provinceRouter = Router();

provinceRouter
    .get('/:id', getAProvince)
    .get('/', getAllProvince)
    .post('/', createProvince)
    .patch('/:id', updateAProvince)
    .delete('/multiple', jsonParser,  deleteMultipleProvince)
    .delete('/:id', deleteAProvince)

export default provinceRouter;