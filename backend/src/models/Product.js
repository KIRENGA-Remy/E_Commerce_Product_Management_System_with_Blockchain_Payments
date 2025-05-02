const Product = (sequelize, DataTypes) => {
    const ProductModel = sequelize.define('Product', {
        product_name: {type: DataTypes.STRING, allowNull: false},
        price: {type: DataTypes.DECIMAL(10,2),allowNull: false},
        description: { type: DataTypes.TEXT},
        imageUrl: {type: DataTypes.STRING},
        stock: {type: DataTypes.INTEGER, defaultValue: 0}
    },
    {
        timestamps: false 
    });
    return ProductModel;
}

export default Product