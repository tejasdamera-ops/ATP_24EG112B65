import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-3xl space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Employee management, simplified.
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Add, view, and edit employee records in a clean, straightforward
          interface.
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
    </section>
  );
}

export default Home;
