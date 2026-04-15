const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Multa = sequelize.define('Multa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    emprestimo_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'emprestimos',
            key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
    },
    quitado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    valor: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'multas',
    timestamps: true,
    underscored: false,
});

module.exports = Multa;