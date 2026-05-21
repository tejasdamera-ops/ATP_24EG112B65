import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EMP_API_URL } from "../config/apiConfig.js";

function CreateEmp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onFormSubmit = async (newEmpObj) => {
    try {
      setLoading(true);

      let res = await fetch(`${EMP_API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmpObj),
      });

      if (res.status === 201) {
        navigate("/list");
      } else {
        let errorRes = await res.json();
        throw new Error(errorRes.reason);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-3xl">Loading....</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center text-2xl">{error}</p>;
  }

  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-2xl shadow-slate-200/80 sm:p-10">
      <div className="space-y-3 text-center">
        <p className="font-semibold uppercase tracking-[0.3em] text-sky-600">
          New employee
        </p>
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Create a clean employee record
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-500">
          Fill in the details and save the employee to your dashboard. The
          interface is designed for fast data entry and easy review.
        </p>
      </div>

      <form className="mt-10 grid gap-4" onSubmit={handleSubmit(onFormSubmit)}>
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
        />

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
        />

        <input
          type="number"
          placeholder="Mobile number"
          {...register("mobile")}
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
        />

        <input
          type="text"
          placeholder="Designation"
          {...register("designation")}
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
        />

        <input
          type="text"
          placeholder="Company name"
          {...register("companyName")}
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
        />

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-3xl bg-sky-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-sky-700"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default CreateEmp;
