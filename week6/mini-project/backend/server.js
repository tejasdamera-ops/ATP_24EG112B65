import exp from "express";
import { connect } from "mongoose";
import { EmpApp } from "./APIs/employeeAPI.js";
import cors from "cors";


const app = exp();
//add cors middleware
app.use(cors({
  origin: ["http://localhost:5173"]
}));
const port = 5000;

app.use(exp.json());
app.use("/emp-api", EmpApp);

async function ConnectDB() {
  try {
    await connect("mongodb://localhost:27017/employees");
    console.log("database connected");

    app.listen(port, () => {
      console.log(`server started on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
ConnectDB();
