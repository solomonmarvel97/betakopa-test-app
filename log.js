require("dotenv").config();

const log = console.log;

exports.logger = (message, action = "") => {
  log(message);

  if (process.env.ENV === "production") {
    honeybadger(message, action);
  }
};
