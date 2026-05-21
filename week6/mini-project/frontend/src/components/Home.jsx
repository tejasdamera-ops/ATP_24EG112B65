import { useCounterStore } from "../store/CounterStore";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const newCounter = useCounterStore((state) => state.newCounter);
  const newCounterSet = useCounterStore((state) => state.newCounterSet);
  const user = useCounterStore((state) => state.user);

  return (
    <section className="space-y-10">
      <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/80 backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 text-sm font-semibold text-sky-700">
              Employee management made simple
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Keep your team organized with clean employee cards and fast
              actions.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
              Add, view, edit, and delete employee records from a modern
              dashboard experience built for clarity and speed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("create-emp")}
                className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                Create Employee
              </button>
              <button
                onClick={() => navigate("list")}
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                View Employees
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-900/20">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Live stats
            </p>
            <div className="mt-6 space-y-6">
              <div className="rounded-3xl bg-slate-900/80 p-6">
                <p className="text-sm text-slate-400">Active counter</p>
                <h2 className="mt-2 text-4xl font-semibold">{newCounter}</h2>
                <button
                  onClick={newCounterSet}
                  className="mt-4 inline-flex rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
                >
                  Increment counter
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900/80 p-4">
                  <p className="text-sm text-slate-400">Current User</p>
                  <p className="mt-2 text-xl font-semibold">
                    {user?.name || "Guest"}
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-4">
                  <p className="text-sm text-slate-400">Designation</p>
                  <p className="mt-2 text-xl font-semibold">
                    {user?.designation || "Not set"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <article className="overflow-hidden rounded-[1.75rem] bg-sky-600 px-6 py-8 text-white shadow-xl shadow-sky-300/20">
          <h2 className="text-xl font-semibold">Fast onboarding</h2>
          <p className="mt-3 text-sm leading-6 text-sky-100">
            Add employee details quickly with a beautiful form and instant
            validation.
          </p>
        </article>
        <article className="overflow-hidden rounded-[1.75rem] bg-emerald-600 px-6 py-8 text-white shadow-xl shadow-emerald-300/20">
          <h2 className="text-xl font-semibold">Responsive layout</h2>
          <p className="mt-3 text-sm leading-6 text-emerald-100">
            The dashboard adapts smoothly to mobile and desktop screens so your
            team stays productive.
          </p>
        </article>
        <article className="overflow-hidden rounded-[1.75rem] bg-indigo-600 px-6 py-8 text-white shadow-xl shadow-indigo-300/20">
          <h2 className="text-xl font-semibold">Clear employee cards</h2>
          <p className="mt-3 text-sm leading-6 text-indigo-100">
            Browse employee information with easy actions for view, edit, and
            delete.
          </p>
        </article>
      </div>
    </section>
  );
}

export default Home;
