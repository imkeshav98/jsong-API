const mongoose = require("mongoose");

require("dotenv").config();
const connect = () => {
  // connect to database
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connect; // export connect
