const { Router } = require('express');
const { criar, buscarPorId } = require('../controllers/livroController');

const router = Router();

router.post('/', criar);
router.get('/:id', buscarPorId);

module.exports = router;