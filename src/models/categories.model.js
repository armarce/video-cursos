const {db, DataTypes} = require('../utils/database.js');

const Categories = db.define('categories', {

    cartegoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'category_id'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
});

module.exports = Categories;