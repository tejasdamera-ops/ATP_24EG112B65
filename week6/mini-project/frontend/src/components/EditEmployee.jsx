import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { EMP_API_URL } from "../config/apiConfig.js";

function EditEmployee() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { state } = useLocation();
  console.log(state);
  useEffect(() => {
    setValue("name", state.name);
    setValue("email", state.email);
    setValue("mobile", state.mobile);
    setValue("designation", state.designation);
    setValue("companyName", state.companyName);
  }, []);

  const navigate = useNavigate();
  const saveModifiedEmp = async (modifiedEmp) => {
    // console.log(modifiedEmp);
    // Make http put request
    try {
      setLoading(true);
      const res = await axios.put(`${EMP_API_URL}/${state._id}`, modifiedEmp);
      if (res.status === 200) {
        navigate("/list");
      }
    } catch (err) {
      console.log("err in catch", err);
      //deal with err
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <p className="text-center text-4xl">Loading....</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center text-3xl">{error}</p>;
  }
  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-xl shadow-slate-200/80 sm:p-10">
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Edit profile
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          Update employee details
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Change the information below and save your edits. The email address is
          locked for consistency.
        </p>
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit(saveModifiedEmp)}>
        <label className="block space-y-2 text-slate-700">
          <span className="text-sm font-medium">Name</span>
          <input
            type="text"
            placeholder="Enter name"
            {...register("name")}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </label>
        <label className="block space-y-2 text-slate-700">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            placeholder="Enter Email"
            {...register("email")}
            className="w-full rounded-3xl border border-slate-200 bg-slate-100 px-5 py-4 text-sm text-slate-600 outline-none"
            disabled
          />
        </label>
        <label className="block space-y-2 text-slate-700">
          <span className="text-sm font-medium">Mobile</span>
          <input
            type="number"
            placeholder="Enter mobile number"
            {...register("mobile")}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </label>
        <label className="block space-y-2 text-slate-700">
          <span className="text-sm font-medium">Designation</span>
          <input
            type="text"
            placeholder="Enter designation"
            {...register("designation")}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </label>
        <label className="block space-y-2 text-slate-700">
          <span className="text-sm font-medium">Company</span>
          <input
            type="text"
            placeholder="Enter company name"
            {...register("companyName")}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </label>

        <button
          type="submit"
          className="mt-4 inline-flex w-full items-center justify-center rounded-3xl bg-emerald-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-emerald-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;
