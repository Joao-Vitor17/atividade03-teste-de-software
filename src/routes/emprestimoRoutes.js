const { Router } = require('express');
const { criar, buscarPorId, listar, deletar, atualizar, listarPorUsuario } = require('../controllers/emprestimoController');

const router = Router();

router.post('/', criar);
router.get('/:id', buscarPorId);
router.get('/', listar);
router.get('/usuario/:id', listarPorUsuario);
router.delete('/:id', deletar);
router.put('/:id', atualizar);

module.exports = router;