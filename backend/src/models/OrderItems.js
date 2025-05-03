import { DataTypes } from 'sequelize';

const OrderItems = (sequelize) => {
  const model = sequelize.define('OrderItem', {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: 1
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01
      }
    }
  }, {
    timestamps: false,
    tableName: 'order_items'
  });

  model.associate = (models) => {
    model.belongsTo(models.Order, { foreignKey: 'orderId' });
    model.belongsTo(models.Product, { foreignKey: 'productId' });
  };

  return model;
};

export default OrderItems;