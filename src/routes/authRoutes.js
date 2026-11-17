import { Router } from "express";
import Authcontroller from "../controllers/authController.js";

const router = Router();

router.post("/cadastrar", (req, res) =>
    Authcontroller.cadastrar(req, res)
);

router.post("/login", (req, res) =>
    Authcontroller.login(req, res)
);

export default router;