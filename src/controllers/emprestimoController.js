const { criarEmprestimo, buscarEmprestimoPorId, listarEmprestimos, deletarEmprestimo, atualizarEmprestimo, listarEmprestimosUsuario } = require('../services/emprestimoService');

const criar = async (req, res) => {
    const { livro_id, usuario_id, data_devolucao_prevista } = req.body;

    if (!livro_id || !usuario_id || !data_devolucao_prevista) return res.status(400)
        .json({ erro: 'Todos os campos são obrigatórios' })

    const emprestimo = await criarEmprestimo(livro_id, usuario_id, data_devolucao_prevista);
    res.status(201).json(emprestimo);
}

const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const emprestimo = await buscarEmprestimoPorId(id);

        if (!emprestimo) return res.status(404).json({ erro: 'Emprestimo não encontrado!' });
        return res.status(200).json(emprestimo);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno', detalhe: error.message });
    }
}

const listar = async (_req, res) => {
    try {
        const emprestimos = await listarEmprestimos();
        return res.status(200).json(emprestimos);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno', detalhe: error.message });
    }
}

const listarPorUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const emprestimosUsuario = await listarEmprestimosUsuario(id);
        return res.status(200).json(emprestimosUsuario);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno', detalhe: error.message });
    }
}

const deletar = async (req, res) => {
    try {
        const { id } = req.params;
        const deletado = await deletarEmprestimo(id);

        if (!deletado) return res.status(404).json({ erro: 'Emprestimo não encontrado!' });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno', detalhe: error.message });
    }
}

const atualizar = async (req, res) => {
    try {
        const emprestimoAtualizado = await atualizarEmprestimo(req.params.id, req.body);
        if (!emprestimoAtualizado) return res.status(404).json({ erro: 'Emprestimo não encontrado!' });

        return res.status(200).json(emprestimoAtualizado);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno', detalhe: error.message });
    }
}

module.exports = {
    criar,
    buscarPorId,
    listar,
    listarPorUsuario,
    deletar,
    atualizar
};