'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product)
      this.belongsTo(models.User)
    }
  }
  TransactionHistory.init({
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "ProductId Can't Be Null!"
        },
        notEmpty: {
          args: true,
          msg: "ProductId Can't Be Empty!"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "ProductId Can't Be Null!"
        },
        notEmpty: {
          args: true,
          msg: "ProductId Can't Be Empty!"
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Quantity Can't Be Null!"
        },
        notEmpty: {
          args: true,
          msg: "Quantity Can't Be Empty!"
        },
        isInt: {
          args: true,
          msg: "Please Insert Correct Format For Quantity"
        }
      }
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Total Price Can't Be Null!"
        },
        notEmpty: {
          args: true,
          msg: "Total Price tidak boleh kosong"
        },
        isInt: {
          args: true,
          msg: "Please Insert Correct Format For Total Price"
        }
    }
    }
  }, {
    sequelize,
    modelName: 'TransactionHistory',
  });
  return TransactionHistory;
};