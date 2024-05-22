import User from "../../models/user.js";
import Response from "../../utils/Response.js";
import crypto from "crypto";
import { sendAnEmail } from "../../utils/mailer.mjs";

class UserController {
  static profile = async (req, res) => {
    try {
      const user = req.user;

      const userData = await User.findById(user._id);

      res
        .status(200)
        .json(new Response(200, "user found successfully", userData));
    } catch (error) {
      res.status(404).json(new Response(404, error.message, {}));
    }
  };

  static update = async (req, res) => {
    try {
      const user = req.user;
      const { name, username, email, gender } = req.body;
      if (!name && !username && !email && !gender) {
        res
          .status(400)
          .json(new Response(400, "Nothing to update", {}).getJson());
      }
      const userData = await User.findByIdAndUpdate(user._id, {
        name,
        username,
        email,
        gender,
      });

      res
        .status(200)
        .json(new Response(200, "user found successfully", userData));
    } catch (error) {
      res.status(404).json(new Response(404, "user not found", {}));
    }
  };

  static changePassword = async (req, res) => {
    try {
      const { username } = req.params;
      const { oldPassword, newPassword } = req.body;

      if ((!username && !oldPassword) || !newPassword) {
        res
          .status(400)
          .json(new Response(400, "Please provide all fields", {}).getJson());
      }

      const userData = await User.findOne({ username });

      const isMatch = await User.comparePassword(oldPassword);

      if (!isMatch) {
        res.status(400).json(new Response(400, "wrong password", {}));
      }

      const password = await User.hashPassword(newPassword);

      const updatedUser = await userData.updateOne({ password });

      res.status(200).json(
        new Response(200, "user found successfully", {
          username: updatedUser.username,
          newPassword: password,
        })
      );
    } catch (error) {
      res.status(404).json(new Response(404, "user not found", {}));
    }
  };

  static requestResetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json(new Response(400, "Email is required", {}).getJson());
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json(new Response(400, "User not found", {}).getJson());
    }

    // Generate a random reset password token
    const token = crypto.randomBytes(20).toString("hex");

    // Set the reset password token and expiration date
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    // Send email
    const resetPasswordUrl = `http://localhost:8000/user/resetPassword/${token}`;
    const messge = `You are receiving this email because you (or someone else) has requested the reset of a password. Please click on the following link, or paste this into your browser to complete the process: \n\n ${resetPasswordUrl}`;

    try {
      await sendAnEmail(email, "Reset Password", messge);

      return res
        .status(200)
        .json(new Response(200, "Reset password email sent", {}).getJson());
    } catch (error) {
      // reset token and expiration date
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000;
      await user.save();
      console.log(error);
      return res
        .status(500)
        .json(new Response(500, "Error sending email", {}).getJson());
    }
  };

  static resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token) {
      return res
        .status(400)
        .json(new Response(500, "Token is not valid", {}).getJson());
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json(
          new Response(500, "Token is not valid Or has expired", {}).getJson()
        );
    }
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res
      .status(200)
      .json(new Response(200, "Password reset successful", {}).getJson());
  };

  static delete = async (req, res) => {
    try {
      const user = req.user;

      const deletedUserData = await User.findByIdAndDelete(user._id);

      res.status(200).json(new Response(200, error.message, deletedUserData));
    } catch (error) {
      res.status(404).json(new Response(404, "user not found", {}));
    }
  };
}

export default UserController;
