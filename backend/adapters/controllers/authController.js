import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";
import Response from "../../Response/Response.js";

class AuthController {
  static register = async (req, res) => {
    const { name, username, email, password, gender } = req.body;
    if (!name || !username || !email || !password || !gender) {
      res
        .status(400)
        .json(
          new Response(
            400,
            "Please provide all the required fields",
            {}
          ).getJson()
        );
    } else {
      try {
        // check if a user with the given username already exists before creating a new user.
        const oldUser = await User.findOne({ username });
        if (oldUser) {
          throw new Error("User already exists!");
        }

        const hashedPassword = await User.hashPassword(password);

        // create random profile picture depending on gender
        const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femmaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const profilePic =
          gender === "male" ? maleProfilePic : femmaleProfilePic;

        // create a new user
        const user = await User.create({
          name,
          username,
          password: hashedPassword,
          gender,
          profilePicture: profilePic,
        });

        await user.save();

        res
          .status(201)
          .json(new Response(201, "User created successfully", user).getJson());
      } catch (error) {
        res.status(400).json(new Response(400, error.message, {}).getJson());
      }
    }
  };

  static login = async (req, res) => {
    const { username, email, password } = req.body;
    if ((!username && !email) || !password) {
      res
        .status(400)
        .json(
          new Response(
            400,
            "Please provide all the required fields",
            {}
          ).getJson()
        );
    } else {
      try {
        let user = undefined;
        if (username) {
          user = await User.findOne({ username });
        } else {
          user = await User.findOne({ email });
        }

        if (user) {
          const isPasswordMatch = await user.comparePassword(password);
          if (isPasswordMatch) {
            const token = await user.generateAuthToken();
            setHttpOnlyCookie(res, token);
            res.status(200).json(
              new Response(200, "User logged in successfully", {
                token,
                user,
              }).getJson()
            );
          } else {
            res
              .status(400)
              .json(
                new Response(400, "Invalid username or password", {}).getJson()
              );
          } // in case wrong password
        } else {
          res
            .status(400)
            .json(
              new Response(400, "Invalid username or password", {}).getJson()
            );
        } // in case user not found
      } catch (error) {
        res.status(400).json(new Response(400, error.message, {}).getJson());
      }
    }
  };

  static logout = (req, res) => {
    try {
    } catch (error) {}
    res.status(200).send("User logged out successfully");
  };

  static verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
      res
        .status(401)
        .json(
          new Response(
            401,
            "Access Denied or Unauthorized requestd",
            {}
          ).getJson()
        );
    } else {
      token = new String(token).replace("Bearer ", "");

      if (!token || token === "null") {
        res
          .status(401)
          .json(
            new Response(
              401,
              "Access Denied or Unauthorized requestd",
              {}
            ).getJson()
          );
      }

      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

      if (!verifyToken) {
        res
          .status(401)
          .json(
            new Response(
              401,
              "Access Denied or Unauthorized requestd",
              {}
            ).getJson()
          );
      }

      // if everything is fine, save the user data (id and username) in the request object
      req.user = verifyToken;
      // call the next middleware
      next();
    }
  };
}

function setHttpOnlyCookie(res, token, options = {}) {
  const secure = process.env.NODE_ENV === "production"; // Set secure flag only in production
  res.cookie("jwt", token, {
    httpOnly: true,
    secure,
    sameSite: "strict", // Restrict cookie to same-site requests
    ...options,
  });
}

export default AuthController;
