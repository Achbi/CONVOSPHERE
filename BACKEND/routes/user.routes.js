import express from "express"
import { getusersByID } from "../controllers/user.controller.js";
import protectMessage from "../middlewares/protectroute.js";



const router = express.Router();

router.get("/getusers",protectMessage,getusersByID);

export default router;


