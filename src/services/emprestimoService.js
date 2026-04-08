const { Emprestimo } = require('../models');

const criarEmprestimo = async (livro_id, usuario_id, data_devolucao_prevista) => {
    const emprestimo = await Emprestimo.create({ livro_id, usuario_id, data_devolucao_prevista });
    return {
        id: emprestimo.id,
        livro_id: emprestimo.livro_id,
        usuario_id: emprestimo.usuario_id,
        data_devolucao_prevista: emprestimo.data_devolucao_prevista,
    };
};

const buscarEmprestimoPorId = async (id) => {
    return await Emprestimo.findByPk(id);
}

const listarEmprestimos = async () => {
    return await Emprestimo.findAll();
}

const listarEmprestimosUsuario = async (usuario_id) => {
    return await Emprestimo.findAll({
        where: {
            usuario_id: usuario_id
        }
    });
}

const deletarEmprestimo = async (id) => {
    const emprestimo = await Emprestimo.findByPk(id);
    if (!emprestimo) return false;
    await emprestimo.destroy();
    return true;
}

const atualizarEmprestimo = async (id, dados) => {
    const emprestimo = await Emprestimo.findByPk(id);
    if (!emprestimo) return null;

    const camposPermitidos = ['livro_id', 'usuario_id', 'data_devolucao_prevista', 'data_devolucao_real'];

    for (const campo of camposPermitidos) {
        if (campo in dados) {
            emprestimo[campo] = dados[campo];
        }
    }

    await emprestimo.save();
    return emprestimo;
}

module.exports = {
    criarEmprestimo,
    buscarEmprestimoPorId,
    listarEmprestimos,
    listarEmprestimosUsuario,
    deletarEmprestimo,
    atualizarEmprestimo,
};