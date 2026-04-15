const { criarMulta, buscarMultaPorId, listarMultas, deletarMulta, atualizarMulta } = require('../services/multaService');

const criar = async (req, res) => {
    const { emprestimo_id, quitado, tipo, valor, descricao } = req.body;

    if (!emprestimo_id || !tipo || !valor) return res.status(400)
        .json({ erro: 'Todos os campos são obrigatórios' })

    const multa = await criarMulta(emprestimo_id, tipo, valor, descricao);
    res.status(201).json(multa);
}

const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const multa = await buscarMultaPorId(id);

        if (!multa) return res.status(404).json({ erro: 'Multa não encontrado!' });
        return res.status(200).json(multa);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno', detalhe: error.message });
    }
}

const listar = async (_req, res) => {
    try {
        const multas = await listarMultas();
        return res.status(200).json(multas);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno', detalhe: error.message });
    }
}

const deletar = async (req, res) => {
    try {
        const { id } = req.params;
        const deletado = await deletarMulta(id);

        if (!deletado) return res.status(404).json({ erro: 'Multa não encontrada!' });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno', detalhe: error.message });
    }
}

const atualizar = async (req, res) => {
    try {
        const multaAtualizada = await atualizarMulta(req.params.id, req.body);
        if (!multaAtualizada) return res.status(404).json({ erro: 'Multa não encontrada!' });

        return res.status(200).json(multaAtualizada);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno', detalhe: error.message });
    }
}

module.exports = {
    criar,
    buscarPorId,
    listar,
    deletar,
    atualizar
};