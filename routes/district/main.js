import { createDistrict, getADistrict, getAllDistrict, updateADistrict, deleteADistrict, deleteMultipleDistrict } from "../../controllers/district/main.js";
import { Router } from "express";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

const districtRouter = Router();

districtRouter
    .get('/:id', getADistrict)
    .get('/', getAllDistrict)
    .post('/multiple', jsonParser, deleteMultipleDistrict)
    .post('/', createDistrict)
    .patch('/:id', updateADistrict)
    .delete('/:id', deleteADistrict);

export default districtRouter;
