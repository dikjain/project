import express from "express";
import { createLine, getLines, likeLine, dislikeLine, getLikedLines, myLines, deleteLine } from "../controller/lines.controller.js";

const router = express.Router();

router.post("/create", createLine);
router.get("/get", getLines);
router.post("/like/:lineId/:userid", likeLine);
router.post("/dislike/:lineId/:userid", dislikeLine);
router.post("/liked/:userid", getLikedLines);
router.post("/mylines/:userid", myLines);
router.post("/delete/:lineId", deleteLine);

export default router;
