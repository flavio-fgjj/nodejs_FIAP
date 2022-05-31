require('dotenv').config()

const config = () => {
  return{
    jwtSecret:'sss',
    jwtExpires:'2d',
    salt:10,
    dbPath: process.env.MONGO_PATH
  }
}
module.exports = config();