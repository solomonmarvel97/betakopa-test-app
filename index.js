require("dotenv").config();
const express = require("express");
const app = express();
const Honeybadger = require("@honeybadger-io/js");
const uuid = require("uuid");

const port = process.env.PORT || 3000;

// module imports
const { logger } = require("./log");

// honeybadger confg
Honeybadger.configure({
  apiKey: process.env.HONEYBADGER,
  environment: "production",
});


// home route
app.get("/", (req, res) => {
  // try this operation in case we have an error
  try {
    // generate a userid using uuid
    const userid = uuid.v4();
    // if successful, send the user id to the client
    res.send(userid);
  } catch (err) {
    // if it fails, log the error
    Honeybadger.notify(err);
    logger(err);
    throw Error(err.messsage);
  }
});

// honeybadger middlewares
app.use(Honeybadger.requestHandler);
app.use(Honeybadger.errorHandler);


// start the server
app.listen(port, () => {
  logger(`Server is running @ port ${port}`);
});
