import express from "express";
import { create,  deletedata,getAll, update} from "../controllers/course.controller.js";




const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.put( '/updatee/:cId', update);
route.delete( '/delete/:ccId', deletedata);









export default route;