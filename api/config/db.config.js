// require('dotenv').config()
// const Sequelize = require('sequelize')

// // root@localhost P@ssw0rd
// const sequelize = new Sequelize(process.env.DATABASE, process.env.USER1, process.env.PASSWORD, {
//   host: process.env.HOST,
//   dialect: 'mysql',
//   maxConcurrentQueries: 100,
//   define: {
//     timestamps: false,
//     freezeTableName: true
//   }
// })

// exports.sequelize = sequelize

// exports.connection = () => {
//   sequelize
//     .authenticate()
//     .then(() => {
//       console.log('connection established succesfully')
//     })
//     .catch((err) => {
//       console.error(`Unable to connect to database ${err}`)
//     })
// }

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
