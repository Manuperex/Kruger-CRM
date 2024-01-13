import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Employee from "../components/Employee";
import { getEmployees } from "../data/employee.js";

export function loader() {
  const employees = getEmployees();
  return employees;
}
const Index = () => {
  const employees = useLoaderData();

  // Estado para almacenar la información del usuario
  const [userData, setUserData] = useState(null);

  // Efecto que se ejecuta cuando el componente se monta
  useEffect(() => {
    // Obtener el valor del Local Storage
    const storedUser = localStorage.getItem("user");

    // Verificar si hay algo almacenado
    if (storedUser) {
      // Convertir el JSON almacenado de vuelta a un objeto JavaScript
      const userObject = JSON.parse(storedUser);

      // Actualizar el estado con la información del usuario
      setUserData(userObject);
    }
  }, []);

  return (
    <>
      <h1 className="font-black text-4xl text-orange-600">Empleados</h1>
      <p className="mt-3 ">Administra los Empleados</p>
      {employees.length ? (
        <div className="overflow-auto">
          <table className="w-full bg-white shadow mt-5 table-auto overflow-hidden">
            <thead className="bg-orange-400 text-white ">
              <tr>
                <th className="p-2">Nombre Completo</th>
                <th className="p-2">Cédula</th>
                <th className="p-2">Contacto</th>
                <th className="p-2">Contraseña</th>
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
              {employees.map((employee) => (
                <Employee key={employee.id} employee={employee} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-10">No hay Empleados Todavia</p>
      )}
    </>
  );
};

export default Index;
