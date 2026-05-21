import { useCounterStore } from "../store/CounterStore";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const newCounter = useCounterStore((state) => state.newCounter);
  const newCounterSet = useCounterStore((state) => state.newCounterSet);
  const user = useCounterStore((state) => state.user);

  return (
    <section className="space-y-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-slate-100 px-4 py-1 text-sm font-semibold text-slate-700">
              Employee management made simple
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Keep your team organized with clean employee cards.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
              Add, view, edit, and delete employee details in a calm,
              easy-to-scan interface.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("create-emp")}
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Create Employee
              </button>
              <button
                onClick={() => navigate("list")}
                className="rounded-full border border-slate-200 bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View Employees
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              Quick stats
            </p>
            <div className="mt-6 space-y-4 text-slate-700">
              <div className="rounded-3xl bg-white px-5 py-4 shadow-sm">
                <p className="text-sm text-slate-500">Active counter</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                  {newCounter}
                </h2>
                <button
                  onClick={newCounterSet}
                  className="mt-4 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Increment
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white px-5 py-4 shadow-sm">
                  <p className="text-sm text-slate-500">Current user</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    {user?.name || "Guest"}
                  </p>
                </div>
                <div className="rounded-3xl bg-white px-5 py-4 shadow-sm">
                  <p className="text-sm text-slate-500">Designation</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    {user?.designation || "Not set"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8 text-slate-800 shadow-sm">
          <h2 className="text-xl font-semibold">Fast onboarding</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Add employee details quickly with a straightforward form.
          </p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8 text-slate-800 shadow-sm">
          <h2 className="text-xl font-semibold">Responsive layout</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            The interface adapts smoothly across mobile and desktop screens.
          </p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8 text-slate-800 shadow-sm">
          <h2 className="text-xl font-semibold">Simple employee cards</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Browse staff information with calm typography and clear actions.
          </p>
        </article>
      </div>
    </section>
  );
}

export default Home;
