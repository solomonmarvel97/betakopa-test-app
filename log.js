require("dotenv").config();
const Honeybadger = require("@honeybadger-io/js");

// honeybadger confg
Honeybadger.configure({
  apiKey: process.env.HONEYBADGER,
  environment: "production",
});

const log = console.log;

exports.logger = (message, action = "") => {
  log(message);
  if (process.env.ENV === "production") {
    Honeybadger.notify(message);
  }
};
