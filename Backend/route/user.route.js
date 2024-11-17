import express from 'express';

import { registeruser, authUser, pickupLine } from '../controller/user.controller.js';

const router = express.Router();

router.post("/register", registeruser);
router.post("/login", authUser);
router.post("/pickupline", pickupLine);

export default router;
