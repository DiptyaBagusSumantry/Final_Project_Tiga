'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category);
      this.hasMany(models.TransactionHistory);
    }
  }
  Product.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Title Can't Be Null!"
        },
        notEmpty: {
          args: true,
          msg: "Title Can't Be Empty!"
        }
      }

    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Price Can't Be Null!"
        },
        notEmpty: {
          args: true,
          msg: "Price Can't Be Empty!"
        },
        isInt: {
          args: true,
          msg: "Please Insert Correct Format For Price"
        },
        max: {
          args: 50000000,
          msg: "Maximum Price is Rp.50.000.000"
        },
        min: {
          args: [0],
          msg: "Minimum Price is Rp.0"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Stock Can't Be Null!"
        },
        notEmpty: {
          args: true,
          msg: "Stock Can't Be Empty!"
        },
        min: 5,
        isInt: {
          args: true,
          msg: "Minimum Stock is 5"
        },
        
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Stock Can't Be Null!"
        },
        notEmpty: {
          args: true,
          msg: "Stock Can't Be Empty!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};