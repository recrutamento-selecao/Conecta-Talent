import { Router } from "express"
import Authcontroller from "../controllers/authController.js";

const router = Router();

router.post("/cadastrar", (req, res) =>
    authController.cadastrar(req, res)
);

export default router;