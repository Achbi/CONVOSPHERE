import express from "express";
const router = express.Router();

import protectMessage from "../middlewares/protectroute.js";
import sendMessage from"../controllers/message.controller.js"
import { getMessage } from "../controllers/message.controller.js";

router.post("/send/:id",protectMessage,sendMessage);
router.get("/:id",protectMessage,getMessage);
export default router;

