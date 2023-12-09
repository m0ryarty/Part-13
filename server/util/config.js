require('dotenv').config()

module.exports = {
  PGDATABASE:process.env.PGDATABASE,
  PGUSER:process.env.PGUSER,
  PGPASSWORD:process.env.PGPASSWORD,  
  PGHOST:process.env.PGHOST,  
  SECRET: process.env.SECRET,
  PORT: process.env.PORT || 3001,
}