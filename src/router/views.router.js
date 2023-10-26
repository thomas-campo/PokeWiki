import { Router } from "express";
import viewsController from "../controller/views.controller.js";

const router = Router();

router.get("/",viewsController.getHome)

export default router;