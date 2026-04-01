const Usuario = require("../models/Usuario");


const criarUsuario = async (nome, email, senha, tipo) => {
    const usuario = await Usuario.create({ nome, email, senha, tipo });
    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        tipo: usuario.tipo
    };
};

const buscarUsuarioPorId = async (id) => {
    return await Usuario.findByPk(id);
}

const listarUsuarios = async () => {
    return await Usuario.findAll();
}

const deletarUsuario = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return false;
    await usuario.destroy();
    return true;
}

const atualizarUsuario = async (id, dados) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;

    const camposPermitidos = ['nome', 'email', 'senha', 'tipo'];

    for(const campo of camposPermitidos) {
        if(campo in dados) {
            usuario[campo] = dados[campo];
        }
    }

    await usuario.save();
    return usuario;
}

module.exports = {
    criarUsuario,
    buscarUsuarioPorId,
    listarUsuarios,
    deletarUsuario,
    atualizarUsuario
};