const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Room = require('./Room');
const Tenant = require('./Tenant');

const Contract = sequelize.define(
    'Contract',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        room_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "Rooms", key: "id" }
        },
        tenant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "Tenants", key: "id" }
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        begin_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        contract_link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nb_months: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: true,
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        deposit: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
    },
    {
        underscored: true,
        timestamp: true,

    },
);



// Contract.associate = (models) => {
//     Contract.belongsTo(models.Tenant, {
//         foreignKey:  'tenant_id',
//     });
//     Contract.belongsTo(models.Room, {
//         foreignKey:  'room_id',
//     });
// };



// (async () => {
//     await sequelize.sync({ force: true});
// });

module.exports = Contract;