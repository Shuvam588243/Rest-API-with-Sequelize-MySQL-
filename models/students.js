
module.exports = (sequelize, DataTypes) =>
{
    const Students = sequelize.define('students',{
        name : DataTypes.STRING,
        email : 
        {
            type : DataTypes.STRING
        },
        gender : 
        {
            type : DataTypes.STRING
        }
    },
    {
        timestamps : false
    })

    return Students
}