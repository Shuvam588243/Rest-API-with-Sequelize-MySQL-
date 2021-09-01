const {Sequelize, DataTypes} = require('sequelize');
const database = "rest_api"

const sequelize = new Sequelize(
    database,
    'root',
    '',
    {
        host : 'localhost',
        dialect : 'mysql',
        pool : {
            max : 5,
            min : 0,
            idle : 1000
        }
    }
)

sequelize.authenticate()
.then(()=>
{
    console.log(`Database is Connect with ${database}`);
})
.catch(err => {
    console.log(`Error Caught : ${err}`);
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.students = require('../models/students')(sequelize, DataTypes);

db.sequelize.sync()
.then(()=>{
    console.log("Synching.......")
})


module.exports = db;