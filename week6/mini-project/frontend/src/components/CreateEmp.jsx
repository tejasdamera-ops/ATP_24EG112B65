import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../config/apiConfig";

function CreateEmp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //form submit
  const onFormSubmit = async (newEmpObj) => {
    try {
      setLoading(true);
      //make HTTP POST req
      let res = await fetch(API_ENDPOINTS.EMPLOYEES, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmpObj),
      });

      if (res.status === 201) {
        //navigate to employees component programatically
        navigate("/list");
      } else {
        let errorRes = await res.json();
        console.log("error response is", errorRes);
        const errorMessage =
          errorRes.error ||
          errorRes.message ||
          errorRes.reason ||
          "Unknown error";
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.log("err in catch", err);
      //deal with err
      setError(err.message || "Failed to create employee.");
    } finally {
      setLoading(false);
    }
  };

  console.log(error);

  if (loading) {
    return <p className="text-center text-4xl">Loading....</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center text-3xl">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-5xl text-center text-gray-600">
        Create New Employee
      </h1>
      {/* form */}
      <form
        className=" max-w-md mx-auto mt-10"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <input
          type="text"
          placeholder="Enter name"
          {...register("name", { required: "Name is required" })}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />
        {errors.name && (
          <p className="text-red-500 mb-3">{errors.name.message}</p>
        )}

        <input
          type="email"
          placeholder="Enter Email"
          {...register("email", { required: "Email is required" })}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />
        {errors.email && (
          <p className="text-red-500 mb-3">{errors.email.message}</p>
        )}

        <input
          type="text"
          placeholder="Enter mobile number"
          {...register("mobile", { required: "Mobile number is required" })}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />
        {errors.mobile && (
          <p className="text-red-500 mb-3">{errors.mobile.message}</p>
        )}

        <input
          type="text"
          placeholder="Enter designation"
          {...register("designation", {
            required: "Designation is required",
          })}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />
        {errors.designation && (
          <p className="text-red-500 mb-3">{errors.designation.message}</p>
        )}

        <input
          type="text"
          placeholder="Enter name of the company"
          {...register("companyName", {
            required: "Company name is required",
          })}
          className="mb-3 border border-2 p-3 w-full rounded-2xl"
        />
        {errors.companyName && (
          <p className="text-red-500 mb-3">{errors.companyName.message}</p>
        )}
        <button
          type="submit"
          className="text-2xl rounded-2xl bg-gray-600 text-white block mx-auto p-4"
        >
          Add Emp
        </button>
      </form>
    </div>
  );
}

export default CreateEmp;
