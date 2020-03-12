module.exports = (sequelize, DataTypes) => {
    const House = sequelize.define('house',{
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        motto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        crest: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
    })
    return House;
}