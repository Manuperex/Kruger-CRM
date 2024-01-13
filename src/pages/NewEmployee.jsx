import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import FormEmployee from "../components/FormEmployee";
import Error from "../components/Error";
import { postEmployee } from "../data/employee.js";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  data.isAdmin = false;
  const email = formData.get("email");
  const identificationCard = formData.get("identificationCard");

  // Creacion contraseñas
  const alph =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%";
  const passGenerate = (length = 15) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += alph.charAt(Math.floor(Math.random() * alph.length));
    }
    return result;
  };
  data.password = passGenerate();
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
  // Envio de la data a la API
  await postEmployee(data);

  return redirect("/");
}

const NewEmployee = () => {
  const error = useActionData();
  const navigate = useNavigate();
  console.log(error);

  return (
    <>
      <h1 className="font-black text-4xl text-orange-600">Nuevo Empleado</h1>
      <p className="mt3">
        Llena todos los campos para registrar un nuevo empleado
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
          <FormEmployee />
          <input
            type="submit"
            className="mt-5 w-full bg-orange-600 pd-3 uppercase font-bold text-white text-lg"
            value="Registrar Empleado"
          />
        </Form>
      </div>
    </>
  );
};

export default NewEmployee;
