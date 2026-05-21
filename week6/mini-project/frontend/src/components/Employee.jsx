import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Employee() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/80">
        <p className="text-center text-lg text-slate-600">
          No employee selected. Please choose a record from the list.
        </p>
        <button
          onClick={() => navigate("/list")}
          className="mt-6 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Go to Employee List
        </button>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/80">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Employee details
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            {state.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {state.designation} at {state.companyName}
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
        >
          Back
        </button>
      </div>

      <div className="mt-8 grid gap-6 rounded-[1.75rem] bg-slate-50 p-6 sm:grid-cols-2">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Email
          </p>
          <p className="text-lg font-medium text-slate-900">{state.email}</p>
        </div>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Mobile
          </p>
          <p className="text-lg font-medium text-slate-900">{state.mobile}</p>
        </div>
      </div>
    </section>
  );
}

export default Employee;
