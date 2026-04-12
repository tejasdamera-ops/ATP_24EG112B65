import exp from "express";
import { EmployeeModel } from "../models/employeeSchema.js";
export const EmpApp = exp.Router();

EmpApp.post("/employees", async (req, res) => {
  try {
    const empData = req.body;
    const empDoc = new EmployeeModel(empData);
    await empDoc.save();
    return res
      .status(201)
      .json({ message: "emp data added successfully", payload: empDoc });
  } catch (err) {
    console.error("POST /employees error", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: "Validation failed", details: err.errors });
    }
    if (err.code === 11000) {
      return res.status(409).json({ error: "Duplicate key", details: err.keyValue });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

//get all employees
EmpApp.get("/employees", async (req, res) => {
  try {
    const empDocs = await EmployeeModel.find();
    return res
      .status(200)
      .json({ message: "emp data fetched successfully", payload: empDocs });
  } catch (err) {
    console.error("GET /employees error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//update employee details
EmpApp.put("/employees/:id", async (req, res) => {
  try {
    const empId = req.params.id;
    const updateData = req.body;
    const updatedEmp = await EmployeeModel.findByIdAndUpdate(empId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmp) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res
      .status(200)
      .json({ message: "Employee updated successfully", payload: updatedEmp });
  } catch (err) {
    console.error("PUT /employees/:id error", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: "Validation failed", details: err.errors });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

//delete employee
EmpApp.delete("/employees/:id", async (req, res) => {
  try {
    const empId = req.params.id;
    const deletedEmp = await EmployeeModel.findByIdAndDelete(empId);
    res.status(200).json({ message: "Employee deleted successfully", payload: deletedEmp });
    } catch (err) {
    console.error("DELETE /employees/:id error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});


