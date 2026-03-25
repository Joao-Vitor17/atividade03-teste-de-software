const { Router } = require('express');
const { criar, buscarPorId, listar, deletar } = require('../controllers/livroController');

const router = Router();

router.post('/', criar);
router.get('/:id', buscarPorId);
router.get('/', listar);
router.delete('/:id', deletar);

module.exports = router;