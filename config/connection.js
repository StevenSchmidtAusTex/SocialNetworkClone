const { connect, connection } = require('mongoose');

// Name of Database
const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/nicenetDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;