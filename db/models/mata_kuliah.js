const {DataTypes} = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
    const attributes = {
      dosen_id: {
        type: DataTypes.INTEGER(),
        field: "dosen_id",
      },
      mahasiswa_id: {
        type: DataTypes.INTEGER(),
        field: "mahasiswa_id",
      },
      nama_matkul: {
        type: DataTypes.STRING(),
        field: "nama_matkul",
      },
      score: {
        type: DataTypes.INTEGER(),
        field: "score",
      },
      status: {
        type: DataTypes.INTEGER(),
        field: "status",
      },
      created_at: {
        type: DataTypes.DATE(),
        allowNull: false,
        comment: null,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
      updated_at: {
        type: DataTypes.DATE(),
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
      },
    };
  
    const options = {
      tableName: "mata_kuliah",
      comment: "",
      indexes: [],
      timestamps: false,
    };
  
    return sequelize.define("mata_kuliah", attributes, options);
  };