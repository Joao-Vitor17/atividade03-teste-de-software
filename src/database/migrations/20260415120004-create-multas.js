'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('multas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      emprestimo_id: {
        type: Sequelize.INTEGER,
        references: { model: 'emprestimos', key: 'id' },
        allowNull: false,
      },
      quitado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      valor: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('multas');
  }
};
