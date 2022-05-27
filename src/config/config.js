const config = () => {
  return{
    jwtSecret:'sss',
    jwtExpires:'2d',
    salt:10,
    dbPath:'mongodb://admin:Mudar1q2w3e@localhost:27017'
  }
}
module.exports = config();