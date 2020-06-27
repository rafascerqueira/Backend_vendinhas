import mongoose from "..";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync();

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", function (next) {
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;

  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
