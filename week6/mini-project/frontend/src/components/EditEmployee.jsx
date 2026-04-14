import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import API_ENDPOINTS from "../config/apiConfig";
function EditEmployee() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) {
      navigate("/list");
      return;
    }

    setValue("name", state.name || "");
    setValue("email", state.email || "");
    setValue("mobile", state.mobile || "");
    setValue("designation", state.designation || "");
    setValue("companyName", state.companyName || "");
  }, [state, setValue, navigate]);

  const saveModifiedFuntion = async (modifiedEmp) => {
    try {
      const res = await axios.put(
        `${API_ENDPOINTS.EMPLOYEES}/${state._id}`,
        modifiedEmp,
      );
      if (res.status === 200) {
        navigate("/list");
      }
    } catch (err) {
      console.error("Error updating employee:", err);
    }
  };

  const deleteByID = async (id) => {
    try {
      const res = await axios.delete(`${API_ENDPOINTS.EMPLOYEES}/${id}`);
      if (res.status === 200) {
        navigate("/list");
      }
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  return (
    <div>
      <h1 className="text-5xl text-center text-gray-600">Edit Employee</h1>
      <form
        className="max-w-md mx-auto mt-10"
        onSubmit={handleSubmit(saveModifiedFuntion)}
      >
        <input
          type="text"
          placeholder="Enter name"
          {...register("name", { required: true })}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="email"
          placeholder="Enter Email"
          {...register("email", { required: true })}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />

        <input
          type="number"
          placeholder="Enter mobile number"
          {...register("mobile", { required: true })}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="text"
          placeholder="Enter designation"
          {...register("designation", { required: true })}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />
        <input
          type="text"
          placeholder="Enter name of the company"
          {...register("companyName", { required: true })}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />

        <button
          type="submit"
          className="text-2xl rounded-2xl bg-green-600 text-white block mx-auto p-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;
