const {DataTypes, NOW} = require('sequelize');
const sequelize = require('../../config/database');

const User = sequelize.define('User',{
    id: { type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    nome: {type:DataTypes.STRING, allowNull: false, len: {args: [2, 100]}},
    email: {type:DataTypes.STRING, allowNull: false, unique: true, len: {args: [20,100]}, validate: {isEmail: {msg: "Insira um email válido"}}},
    senha: {type:DataTypes.STRING, allowNull: false},
    createdAt: {type:DataTypes.DATE, defaultValue: DataTypes.NOW},
    updatedAt: {type:DataTypes.DATE, defaultValue: DataTypes.NOW}
});
module.exports = User;