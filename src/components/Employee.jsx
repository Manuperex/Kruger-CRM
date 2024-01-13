import { useNavigate, Form, redirect } from "react-router-dom";
import { deleteEmployee } from "/src/data/employee.js";

export async function action({ params }) {
  await deleteEmployee(params.employeeId);
  return redirect("/");
}

const Employee = ({ employee }) => {
  const navigate = useNavigate();
  const {
    name,
    lastName,
    identificationCard,
    email,
    id,
    password,
    address,
    dateOfBirth,
    phone,
    vacunacionStatus,
    vacunacionTipe,
    vaccinationDate,
    numberDoses,
  } = employee;

  return (
    <>
      <tr className="border-b text-center">
        <td className="p-3">
          <p className="text-base text-gray-800">
            {name} {lastName}
          </p>
        </td>
        <td className="p-3">
          <p className="text-base text-gray-800">{identificationCard}</p>
        </td>
        <td className="p-3">
          <p className="text-base text-gray-800">
            <span className="text-gray-800 uppercase font-bold">Email: </span>
            {email}
          </p>
          <p className="text-base text-gray-800">
            <span className="text-gray-800 uppercase font-bold">Tel: </span>
            {3508994476}
          </p>
        </td>
        <td className="p-3">
          <p className="text-base text-gray-800">{password}</p>
        </td>
        <td className="p-3">
          <p className="text-base text-gray-800">{dateOfBirth}</p>
        </td>
        <td className="p-3">
          <p className="text-base text-gray-800">{address}</p>
        </td>
        <td className="p-3">
          <p className="text-base text-gray-800">{phone}</p>
        </td>
        <td className="p-3">
          <p className="text-base text-gray-800">{vacunacionStatus}</p>
        </td>
        <td className="p-3">
          <p className="text-base text-gray-800">{vacunacionTipe}</p>
        </td>
        <td className="p-3">
          <p className="text-base text-gray-800">{vaccinationDate}</p>
        </td>
        <td className="p-3">
          <p className="text-base text-gray-800">{numberDoses}</p>
        </td>

        <td className="p-6 flex gap-3 text-center flex-col">
          <button
            type="button"
            className="text-orange-700 hover:text-orange-800 uppercase font-bold text-xs"
            onClick={() => navigate(`/employees/${id}/edit`)}
          >
            Editar
          </button>
          <Form
            method="post"
            action={`/employees/${id}/delete`}
            onSubmit={(e) => {
              if (!confirm("¿Deseas eliminar el Empleado?")) {
                e.preventDefault();
              }
            }}
          >
            <button
              type="submit"
              className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
            >
              Eliminar
            </button>
          </Form>
        </td>
      </tr>
    </>
  );
};

export default Employee;
