const mongoose = require("mongoose");

const myConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL)

    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = myConnection