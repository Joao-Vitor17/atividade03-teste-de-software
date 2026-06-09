const { Multa } = require('../models');

const criarMulta = async (emprestimo_id, tipo, valor, descricao) => {
    const multa = await Multa.create({ emprestimo_id, tipo, valor, descricao });
    return {
        id: multa.id,
        emprestimo_id: multa.emprestimo_id,
        tipo: multa.tipo,
        valor: multa.valor,
        descricao: multa.descricao,
    };
};

const buscarMultaPorId = async (id) => {
    return await Multa.findByPk(id);
}

const listarMultas = async () => {
    return await Multa.findAll({
        where: {
            quitado: false
        }
    });
}

const deletarMulta = async (id) => {
    const multa = await Multa.findByPk(id);
    if (!multa) return false;
    await multa.destroy();
    return true;
}

const atualizarMulta = async (id, dados) => {
    const multa = await Multa.findByPk(id);
    if (!multa) return null;

    const camposPermitidos = ['emprestimo_id', 'quitado', 'tipo', 'valor', 'descricao'];

    for (const campo of camposPermitidos) {
        if (campo in dados) {
            // Alterado de "emprestimo" para "multa"
            multa[campo] = dados[campo]; 
        }
    }

    await multa.save();
    return multa;
}

module.exports = {
    criarMulta,
    buscarMultaPorId,
    listarMultas,
    deletarMulta,
    atualizarMulta,
};