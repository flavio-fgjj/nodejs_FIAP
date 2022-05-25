const config = () => {
  return{
    jwtSecret:"sss",
    jwtExpires:"2d",
    salt:10,
    dbPath:"mongodb+srv://edilson:Alunos123@projetobanco.syyui.mongodb.net/dbinfra?retryWrites=true&w=majority"
  }
}
module.exports = config();