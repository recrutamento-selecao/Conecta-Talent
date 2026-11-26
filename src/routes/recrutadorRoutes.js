import { Router } from 'express';
import {
  criar,
  buscarPorIdUsuario,
  listarDaEmpresa,
  atualizar,
} from '../controllers/recrutadorController.js';

const router = Router();

router.post('/', criar);
router.get('/usuario/:id_usuario', buscarPorIdUsuario);
router.get('/empresa/:id_empresa', listarDaEmpresa);
router.put('/:id_recrutador', atualizar);

export default router;