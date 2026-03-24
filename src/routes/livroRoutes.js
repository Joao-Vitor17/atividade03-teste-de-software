const { Router } = require('express');
const { criar, buscarPorId, listar } = require('../controllers/livroController');

const router = Router();

router.post('/', criar);
router.get('/:id', buscarPorId);
router.get('/', listar);

module.exports = router;