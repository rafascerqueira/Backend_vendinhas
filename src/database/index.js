const mongoose = require("mongoose");

const uri = process.env.MONGO_URI || "mongodb://localhost/vendinhas";

mongoose.connect(uri, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});
mongoose.Promise = global.Promise;

module.exports = mongoose;
