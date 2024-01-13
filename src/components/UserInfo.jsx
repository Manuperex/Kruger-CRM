import { useNavigate, Form, redirect } from "react-router-dom";
import { deleteEmployee } from "/src/data/employee.js";

export async function action({ params }) {
  await deleteEmployee(params.email);
  return redirect("/");
}

const UserInfo = ({ employee }) => {
  const navigate = useNavigate();
  const { name, lastName, identificationCard, email, id } = employee;

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
          <p className="text-base text-gray-800">Nombre Completo</p>
        </td>
        <td className="p-3">
          <p className="text-base text-gray-800">Nombre Completo</p>
        </td>
        <td className="p-3">
          <p className="text-base text-gray-800">Nombre Completo</p>
        </td>
        <td className="p-3">
          <p className="text-base text-gray-800">Nombre Completo</p>
        </td>
        <td className="p-3">
          <p className="text-base text-gray-800">Nombre Completo</p>
        </td>
        <td className="p-3">
          <p className="text-base text-gray-800">Nombre Completo</p>
        </td>
        <td className="p-3">
          <p className="text-base text-gray-800">Nombre Completo</p>
        </td>

        <td className="p-6 flex gap-3 text-center flex-col">
          <button
            type="button"
            className="text-orange-700 hover:text-orange-800 uppercase font-bold text-xs"
            onClick={() => navigate(`/user/${email}/edit`)}
          >
            Editar
          </button>
          <Form
            method="post"
            action={`/user/${email}/delete`}
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

export default UserInfo;
