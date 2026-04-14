import exp from "express";
import { connect } from "mongoose";
import { EmpApp } from "./APIs/employeeAPI.js";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = exp();
const port = process.env.PORT || 5000;
const mongodbUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/employees";
const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173"];
const nodeEnv = process.env.NODE_ENV || "development";

// Add CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        corsOrigin.includes(origin) ||
        /^https?:\/\/localhost:\d+$/.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(exp.json());
app.use("/emp-api", EmpApp);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Server is running", env: nodeEnv });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: nodeEnv === "development" ? err.message : undefined,
  });
});

async function ConnectDB() {
  try {
    await connect(mongodbUri);
    console.log("Database connected successfully");

    app.listen(port, () => {
      console.log(`Server started on port ${port} in ${nodeEnv} mode`);
    });
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
}

ConnectDB();
