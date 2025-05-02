const Order = (sequelize, DataTypes) => {
    const OrderModel = sequelize.define('Order', {
        status: {
            type: DataTypes.ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled'),
            defaultValue: 'pending'
        },
        bitcoinAmount: {type: DataTypes.DECIMAL(20, 8)},
        bitcoinAddress: {type: DataTypes.STRING, validate: {
            is: /^[a-zA-Z0-9]{26,35}$/ // Basic regex for Bitcoin addresses (testnet/mainnet)
        }},
        transactionHash: {type: DataTypes.STRING,
            validate: {
                is: /^[a-fA-F0-9]{64}$/ // Regex for valid Bitcoin transaction hashes
            }
        }
    },
    {
        timestamps: false 
    });

    OrderModel.associate = models => {
        OrderModel.belongsTo(models.User);
        OrderModel.belongsToMany(models.Product, {through: models.OrderItems})
    }
    return OrderModel;
}

export default Order;