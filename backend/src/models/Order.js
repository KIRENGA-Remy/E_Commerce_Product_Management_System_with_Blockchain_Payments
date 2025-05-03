import { DataTypes } from 'sequelize';

const Order = (sequelize) => {
  const model = sequelize.define('Order', {
    status: {
      type: DataTypes.ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled'),
      defaultValue: 'pending'
    },
    bitcoinAmount: {
      type: DataTypes.DECIMAL(20, 8),
      validate: {
        min: 0.00000001 // Minimum Bitcoin amount (1 satoshi)
      }
    },
    bitcoinAddress: {
      type: DataTypes.STRING,
      validate: {
        is: /^[a-zA-Z0-9]{26,35}$/
      }
    },
    transactionHash: {
      type: DataTypes.STRING,
      validate: {
        is: /^[a-fA-F0-9]{64}$/
      }
    }
  }, {
    timestamps: false,
    tableName: 'orders'
  });

  model.associate = (models) => {
    model.belongsTo(models.User, { foreignKey: 'userId' });
    model.belongsToMany(models.Product, {
      through: models.OrderItems,
      foreignKey: 'orderId'
    });
  };

  return model;
};

export default Order;