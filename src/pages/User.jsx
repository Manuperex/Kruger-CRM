import { useLoaderData } from "react-router-dom";
import { getEmployeeByEmail } from "../data/employee.js";
import UserInfo from "../components/UserInfo";

export async function loader({ params }) {
  const employee = await getEmployeeByEmail(params.emailUser);

  return employee;
}

const User = () => {
  const employee = useLoaderData();
  return (
    <div className="md:w-6/6 p-10 md:h-screen overflow-scroll">
      <h1 className="font-black text-4xl text-orange-600">{`Hola ${employee[0].name}`}</h1>
      <p className="mt-3 ">Tu informacion de vacunacion se escuentra aqui</p>
      <div className="overflow-auto">
        <table className="w-full bg-white shadow mt-5 table-auto overflow-hidden">
          <thead className="bg-orange-400 text-white ">
            <tr>
              <th className="p-2">Nombre Completo</th>
              <th className="p-2">Cédula</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Fecha de nacimiento</th>
              <th className="p-2">Dirección de domicilio</th>
              <th className="p-2">Teléfono móvil</th>
              <th className="p-2">Estado de Vacunación</th>
              <th className="p-2">Tipo de vacunacion</th>
              <th className="p-2">Fecha de vacunación</th>
              <th className="p-2">Número de dosis</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((employee) => (
              <UserInfo key={employee.id} employee={employee} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
