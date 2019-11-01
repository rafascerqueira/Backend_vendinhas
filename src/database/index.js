const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/vendinhas", {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});
mongoose.Promise = global.Promise;

module.exports = mongoose;
