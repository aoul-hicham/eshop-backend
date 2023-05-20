const mongoose = require("mongoose")

//? Database connection setup
const setupDatabaseConnection = () => {
  mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(
      console.log(
        `The connection to ${process.env.MONGO_DB_DATABASE_NAME} database has been successfully established`
      )
    )
    .catch((err) => console.log(err))
}

module.exports = setupDatabaseConnection
