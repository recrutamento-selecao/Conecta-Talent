import { Router } from "express";
import Authcontroller from "../controllers/authController.js";

const router = Router();

router.post("/login", (req, res) =>
    Authcontroller.login(req, res)
);

export default router;  