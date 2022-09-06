const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    ID : {
      type: DataTypes.UUID, // hace un numero random alfanum para evitar coliciones
      defaultValue: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name : {
      type: DataTypes.STRING,
      allowNull: false
    },
    altura : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    peso : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    anosDeVida : {
        type: DataTypes.INTEGER,
        allowNull: true
     },
    createInDb : {
        type : DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
  })
}
