const { criarUsuario, buscarUsuarioPorId, listarUsuarios, deletarUsuario, atualizarUsuario } = require('../services/usuarioService');
const bcrypt = require('bcrypt');

const criar = async (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo) return res.status(400).json({ erro: 'todos os campos são obrigatórios' })

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await criarUsuario(nome, email, senhaHash, tipo);
    res.status(201).json(usuario);
}

const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await buscarUsuarioPorId(id);

        if (!usuario) return res.status(404).json({ erro: 'Usuario não encontrado!' });
        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno', detalhe: error.message });
    }
}

const listar = async (_req, res) => {
    try {
        const usuarios = await listarUsuarios();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno', detalhe: error.message });
    }
}

const deletar = async (req, res) => {
    try {
        const { id } = req.params;
        const deletado = await deletarUsuario(id);

        if (!deletado) return res.status(404).json({ erro: 'Usuario não encontrado!' });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno', detalhe: error.message });
    }
}

const atualizar = async (req, res) => {
    try {
        const usuarioAtualizado = await atualizarUsuario(req.params.id, req.body);
        if (!usuarioAtualizado) return res.status(404).json({ erro: 'Usuario não encontrado!' });

        return res.status(200).json(usuarioAtualizado);
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