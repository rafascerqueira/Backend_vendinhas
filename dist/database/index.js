"use strict";

const mongoose = require("mongoose");

require("dotenv").config();

const uri = process.env.MUMU || "mongodb://localhost/vendinhas";
mongoose.connect(uri, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});
mongoose.Promise = global.Promise;
module.exports = mongoose;
//# sourceMappingURL=index.js.map