const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Emprestimo = sequelize.define('Emprestimo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    livro_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'livros',
            key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
    },
    data_devolucao_prevista: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    data_devolucao_real: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'emprestimos',
    timestamps: true,
    underscored: false,
});

module.exports = Emprestimo;