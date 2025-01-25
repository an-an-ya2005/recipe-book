
const mongoose = require("mongoose");
const ConnectURI = "mongodb://localhost:27017/taste";
mongoose.set('strictQuery', true);

const ConnectToMongo = async () => {
  try {
    await mongoose.connect(ConnectURI);
    console.log("Connect To Mongo Successful");
  } catch (err) {
    console.log("Connect To Mongo Unsuccessful", err);
  }
};
module.exports = ConnectToMongo;