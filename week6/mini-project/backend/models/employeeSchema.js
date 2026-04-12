import {Schema,model  } from "mongoose";

const employeeSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    mobile:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    }
})

export const EmployeeModel = model("Employee",employeeSchema);