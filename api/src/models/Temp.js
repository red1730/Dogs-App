const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temp', {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        // primaryKey: true
    }
  })
};