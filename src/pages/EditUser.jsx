import {
  useNavigate,
  Form,
  useLoaderData,
  redirect,
  useActionData,
} from "react-router-dom";
import { getEmployeeByEmail, updateUser } from "../data/employee.js";
import FormUser from "../components/FormUser";
import Error from "../components/Error";

export async function loader({ params }) {
  const employee = await getEmployeeByEmail(params.email);
  console.log(params.email);
  return employee;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const email = formData.get("email");
  const identificationCard = formData.get("identificationCard");
  // Validacion
  const error = [];
  if (Object.values(data).includes("")) {
    error.push("Todos los campos son obligatorios");
  }
  //Validacion del correo
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
    error.push("el email no es valido");
  }
  //Validacion de Cedula
  if (identificationCard.length > 10) {
    error.push("Cedula no valida, es muy larga");
  }
  if (identificationCard.length === 0) {
    error.push("Cedula no valida no colocaste datos");
  }
  // Retornar datos si hay errores
  if (Object.keys(error).length) {
    return error;
  }
  // Actualizar Empleado
  await updateUser(params.email, data);
  return null;
}
// redirect(`/user/${params.email}

const EditUser = () => {
  const navigate = useNavigate();
  const employee = useLoaderData();
  const employeeUser = employee[0];
  const error = useActionData();
  const editing = true;
  console.log(employeeUser);

  return (
    <>
      <h1 className="font-black text-4xl text-orange-600">Editar Empleado</h1>
      <p className="mt3">
        En esta zona podras modificar los datos de un empleado
      </p>

      <div className="flex justify-end">
        <button
          className="bg-orange-600 text-white px-3 py-1 font-bold uppercase rounded-lg"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {error?.length &&
          error.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form noValidate method="post">
          <FormUser employeeUser={employeeUser} editing={editing} />
          <input
            type="submit"
            className="mt-5 w-full bg-orange-600 pd-3 uppercase font-bold text-white text-lg"
            value="Guardar Empleado"
          />
        </Form>
      </div>
    </>
  );
};

export default EditUser;
