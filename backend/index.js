import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// routers
import authRouter from "./routers/authRouter.js";
import notesRouter from "./routers/notesRouter.js";
import userRouter from "./routers/userRouter.js";

// db
import connectDB from "./db/connectDB.js";

// server constants
const port = process.env.PORT || 8000;
const url = `http://localhost:${port}/`;

/**
 * Loads environment variables from a `.env` file into `process.env`.
 * This allows the application to access sensitive configuration values
 * like database connection strings or API keys without hardcoding them
 * in the source code.
 */
dotenv.config();

const app = express();

/**
 * Enables CORS (Cross-Origin Resource Sharing) middleware for the Express.js application
 * to allow the application to receive requests from other domains.
 */
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.send("Hello From notes application!");
});

/**
 * Mounts the authentication, notes, and user routers to the specified routes.
 * - `/auth`: Handles user authentication routes.
 * - `/notes`: Handles all note-related routes.
 * - `/user`: Handles all user-related routes.
 */
app.use("/auth", authRouter);
app.use("/notes", notesRouter);
app.use("/user", userRouter);

// handle MongoDB connection
await connectDB();

// start the server
app.listen(port, () => {
  console.log(`Notes app listening on port ${port}!`);
  console.log(`🚀 Server ready at ${url}`);
});
