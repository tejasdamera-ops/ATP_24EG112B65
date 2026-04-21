// Create express application
import exp from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import { userApp } from "./API/UserAPI.js";
import { authorApp } from "./API/AuthorAPI.js";
import { adminApp } from "./API/AdminAPI.js";
import { commonApp } from "./API/commonAPI.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = exp();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    //methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    //allowedHeaders: ["Content-Type", "Authorization"]
  }),
);

// body parser middleware
app.use(exp.json());
app.use(cookieParser());

// root route for health checks
app.get("/", (req, res) => {
  res.status(200).json({ message: "Blog API Server is running" });
});

//path level middleware
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);
app.use("/auth", commonApp);

// assign port

// conchx aganect to db
const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log("connected to database");

    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`server started on port ${port}`));
  } catch (err) {
    console.log("error in db connection");
  }
};

connectDB();

//to handle invalid path
app.use((req, res, next) => {
  console.log(req.url);
  res.status(404).json({ message: `path ${req.url} is invalid` });
});

// error handling middleware[ALWAYS KEEP AT END OF THE FILE]
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  // ValidationError
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // CastError
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue =
    err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  // Duplicate key error
  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];

    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  // Server error
  res.status(500).json({
    message: "error occurred",
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});
