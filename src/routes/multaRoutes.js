const { Router } = require('express');
const { criar, buscarPorId, listar, deletar, atualizar } = require('../controllers/multaController');

const router = Router();

router.post('/', criar);
router.get('/:id', buscarPorId);
router.get('/', listar);
router.delete('/:id', deletar);
router.put('/:id', atualizar);

module.exports = router;