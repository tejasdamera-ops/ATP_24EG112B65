import { Schema,model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    LastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: [true, "email already exists"],
    },
    password: {
      type: String,
      required: [true, "password is requird"],
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "AUTHOR"],
      required: [true, "role is requird"],
    },
    profileImageURL: {
      type: String,
    },
    isUserActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  },
);

export const UserModel = model("user", userSchema);
