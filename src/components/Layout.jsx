import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="md:flex md:min-h-screen">
      <aside className="md:w-1/6 bg-orange-600 px-5 py-10">
        <h2 className="text-4xl font-black text-center text-white">
          Kruger CRM
        </h2>
        <nav className="mt-10">
          <Link
            className={`${
              location.pathname === "/" ? "text-orange-200" : "text-white"
            } text-2xl block mt-2 hover:text-orange-200`}
            to="/"
          >
            Empleados
          </Link>
          <Link
            className={`${
              location.pathname === "/employees/new"
                ? "text-orange-200"
                : "text-white"
            } text-2xl block mt-2 hover:text-orange-200`}
            to="/employees/new"
          >
            Nuevo Empleado
          </Link>
        </nav>
      </aside>
      <main className="md:w-5/6 p-10 md:h-screen overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
