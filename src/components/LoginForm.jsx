import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import { getEmployeeByEmail } from "../data/employee.js";
import Error from "../components/Error";

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const email = data.email;
    const userDataValidate = await getEmployeeByEmail(email);
    // Validacion
    const error = [];
    if (Object.values(data).includes("")) {
      error.push("Todos los campos son obligatorios");
    }
    //Validacion del correo
    let regex = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );
    if (!regex.test(data.email)) {
      error.push("el email no es valido");
    } else {
      // Validacion de  usuario
      if (userDataValidate.length === 0) {
        error.push("Usuario no encontrado");
      } else if (email === userDataValidate[0].email) {
        // Validacion contraseñas
        if (data.password != userDataValidate[0].password) {
          error.push("Contraseña errada");
        }
      }
    }
    // Retornar datos si hay errores
    if (Object.keys(error).length) {
      return error;
    }

    const DataUserLocalStorage = {
      email: userDataValidate[0].email,
      isAdmin: userDataValidate[0].isAdmin,
    };
    localStorage.setItem("user", JSON.stringify(DataUserLocalStorage));
    if (DataUserLocalStorage.isAdmin === true) {
      return redirect("/");
    } else if (DataUserLocalStorage.isAdmin === false) {
      return redirect(`/user/${DataUserLocalStorage.email}`);
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

const LoginForm = () => {
  const error = useActionData();

  return (
    <div>
      <h1 className="text-orange-600 font-black text-6xl capitalize">
        Inicia sesión y llena tus <span className="text-green-600">datos</span>
      </h1>
      <Form
        className="my-10 bg-white shadow rounded-lg py-5 px-10"
        method="post"
        noValidate
      >
        {error?.length &&
          error.map((error, i) => <Error key={i}>{error}</Error>)}
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Usuario
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Usuario de la empresa"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Contraseña de la empresa"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-orange-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-orange-700 transition-colors"
        />
      </Form>
    </div>
  );
};

export default LoginForm;
