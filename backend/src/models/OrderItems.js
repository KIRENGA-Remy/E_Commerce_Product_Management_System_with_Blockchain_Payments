const OrderItems = (sequelize, DataTypes) => {
    const OrderItemsModel = sequelize.define('OrderItem', {
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        timestamps: false // Disable timestamps if not needed
    });

    OrderItemsModel.associate = models => {
        OrderItemsModel.belongsTo(models.Order);
        OrderItemsModel.belongsTo(models.Product);
    };

    return OrderItemsModel;
};

export default OrderItems;