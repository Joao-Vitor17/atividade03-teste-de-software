'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('emprestimos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      livro_id: {
        type: Sequelize.INTEGER,
        references: { model: 'livros', key: 'id' },
        allowNull: false,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id' },
        allowNull: false,
      },
      data_devolucao_prevista: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_devolucao_real: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('emprestimos');
  }
};
