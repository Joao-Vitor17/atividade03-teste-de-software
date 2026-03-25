const { Livro } = require('../models');

const criarLivro = async (titulo, autor) => {
  const livro = await Livro.create({ titulo, autor });
  return {
    id: livro.id,
    titulo: livro.titulo,
    autor: livro.autor,
  };
};

const buscarLivroPorId = async (id) => {
  return await Livro.findByPk(id);
}

const listarLivros = async () => {
  return await Livro.findAll();
}

const deletarLivro = async (id) => {
  const livro = await Livro.findByPk(id);
  if (!livro) return false;
  await livro.destroy();
  return true;
}

module.exports = {
  criarLivro,
  buscarLivroPorId,
  listarLivros,
  deletarLivro
};