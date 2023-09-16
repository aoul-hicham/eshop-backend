const mongoose = require('mongoose')

const setupDatabaseConnection = () => {
  mongoose
    .connect(process.env.db_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log('database connection is established'))
    .catch((err) => console.log(err))
}

module.exports = setupDatabaseConnection
