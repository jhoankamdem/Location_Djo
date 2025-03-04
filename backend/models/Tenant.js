const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Account = require('./Account');

const Room = require('./Room');
const Contract = require('./Contract');

const Tenant = sequelize.define(
    'Tenant',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },        
        payment_day: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        underscored: true,
    }
);

Tenant.belongsTo(Account, {
    foreignKey: {
        name: 'account_id',
    },
});

Account.hasOne(Tenant);

// Tenant.associate = (models) => {
//     Tenant.belongsToMany(models.Room, {
//         through: models.Contract,
//         foreignKey: 'tenant_id',
//         otherKey: 'room_id',
//     });
// };

// Room.associate = (models) => {
//     Room.belongsToMany(models.Tenant, {
//         through: models.Contract,
//         foreignKey: 'room_id',
//         otherKey: 'tenant_id',
//     });
// };

Tenant.belongsToMany(Room, {
    through: Contract,
    foreignKey: 'tenant_id',
    otherKey: 'room_id',
});
Room.belongsToMany(Tenant, {
    through: Contract,
    foreignKey: 'room_id',
    otherKey: 'tenant_id',
});

Contract.belongsTo(Tenant, {
    foreignKey:  'tenant_id',
});
Contract.belongsTo(Room, {
    foreignKey:  'room_id',
});

Tenant.hasMany(Contract);
Room.hasMany(Contract);

// const getBuilding = () => {
//     this.
// }

// (async () => {
//     await sequelize.sync({ force: true});
// });

module.exports = Tenant;