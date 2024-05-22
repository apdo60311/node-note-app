import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

// hashing user's password
userSchema.methods.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Method for comparing passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  // Use the bcrypt `compare` function to compare the candidate password with the stored hash
  const isMatch = await bcrypt.compare(candidatePassword, user.password);
  return isMatch;
};

// Method for generating an auth token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "300h" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

export default User;
