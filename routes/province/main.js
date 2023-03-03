import { createProvince, getAProvince, getAllProvince, deleteAProvince, deleteMultipleProvince, updateAProvince } from "../../controllers/province/main.js";
import { Router } from "express";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

const provinceRouter = Router();

provinceRouter
    .get('/:id', getAProvince)
    .get('/', getAllProvince)
    .post('/multiple', jsonParser,  deleteMultipleProvince)
    .post('/', createProvince)
    .patch('/:id', updateAProvince)
    .delete('/:id', deleteAProvince)

export default provinceRouter;