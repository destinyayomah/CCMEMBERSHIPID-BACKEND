import {
    createSubDistrict,
    getASubDistrict,
    getAllSubDistrict,
    updateASubDistrict,
    deleteASubDistrict,
    deleteMultipleSubDistrict
} from "../../controllers/subDistrict/main.js";
import { Router } from "express";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

const subDistrictRouter = Router();

subDistrictRouter
    .get('/:id', getASubDistrict)
    .get('/', getAllSubDistrict)
    .post('/', createSubDistrict)
    .patch('/:id', updateASubDistrict)
    .delete('/multiple', jsonParser, deleteMultipleSubDistrict)
    .delete('/:id', deleteASubDistrict)

export default subDistrictRouter;