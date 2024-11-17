import express from 'express';

import { registeruser, authUser, pickupLine, nextMove } from '../controller/user.controller.js';

const router = express.Router();

router.post("/register", registeruser);
router.post("/login", authUser);
router.post("/pickupline", pickupLine);
router.post("/nextmove", nextMove);

export default router;
