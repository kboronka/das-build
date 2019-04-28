module.exports = {
  port: process.env.PORT || 8080,
  secret: process.env.SECRET || 'secret-goes-here',
  database: process.env.DATABASE || 'mongodb://localhost:27017/db-name-goes-here'
}
