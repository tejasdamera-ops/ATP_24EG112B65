import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className="sticky top-0 z-20 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-900">
            Employee Hub
          </h1>
          <p className="text-sm text-slate-500">Manage your team simply</p>
        </div>

        <ul className="flex flex-wrap items-center gap-3 text-sm sm:gap-5">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "rounded-full bg-slate-100 px-4 py-2 text-slate-900"
                  : "rounded-full px-4 py-2 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="create-emp"
              className={({ isActive }) =>
                isActive
                  ? "rounded-full bg-slate-100 px-4 py-2 text-slate-900"
                  : "rounded-full px-4 py-2 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              }
            >
              Add Employee
            </NavLink>
          </li>
          <li>
            <NavLink
              to="list"
              className={({ isActive }) =>
                isActive
                  ? "rounded-full bg-slate-100 px-4 py-2 text-slate-900"
                  : "rounded-full px-4 py-2 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              }
            >
              Employee List
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
