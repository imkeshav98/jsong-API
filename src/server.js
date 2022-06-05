const app = require("./index");
const connect = require("./config/db");
const port = process.env.PORT || 5000; // set port

app.listen(port, async () => {
  // listen on port
  try {
    await connect(); // connect to database
    console.log(`Server started on port ${port}`); // log server started
  } catch (err) {
    console.log(`Server failed to start on port ${port}`); // log server failed to start
  }
});
