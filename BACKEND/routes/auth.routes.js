import express from "express";
import { SignUP } from "../controllers/auth.controller.js";
import { loginUser } from "../controllers/auth.controller.js";
import { logoutUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",SignUP );
router.post("/login",loginUser);

router.post("/logout",logoutUser);

export default router;