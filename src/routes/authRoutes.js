import { Router } from "express";
import AuthController from "../controllers/authController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", AuthController.login);
router.post("/oauth", AuthController.loginOAuth);
router.post("/cadastro/candidato", AuthController.cadastrarCandidato);
router.post("/cadastro/empresa", AuthController.cadastrarEmpresa);
router.put(
    "/cadastro/empresa/dados",
    AuthMiddleware.validarToken,
    AuthController.atualizarDadosEmpresa
);

export default router;