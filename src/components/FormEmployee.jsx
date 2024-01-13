import { useState } from "react";

const FormEmployee = ({ employee, editing }) => {
  const [stateVacunation, setStateVacunation] = useState("");

  return (
    <>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="name">
          Nombres:
        </label>
        <input
          id="name"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Nombres del Empleado"
          name="name"
          defaultValue={employee?.name}
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="lastName">
          Apellidos:
        </label>
        <input
          id="lastName"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Apellidos del Empleado"
          name="lastName"
          defaultValue={employee?.lastName}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="email">
          E-mail:
        </label>
        <input
          id="email"
          type="email"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Email del Empleado"
          name="email"
          defaultValue={employee?.email}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="identificationCard">
          Cédula:
        </label>
        <input
          id="identificationCard"
          type="number"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Cédula del Empleado"
          name="identificationCard"
          defaultValue={employee?.identificationCard}
        />
      </div>
      {editing === true ? (
        <div>
          <div className="mb-4">
            <label className="text-gray-800" htmlFor="dateOfBirth">
              Fecha de nacimiento:
            </label>
            <input
              id="dateOfBirth"
              type="date"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Fecha de nacimiento"
              name="dateOfBirth"
              defaultValue={`${
                employee?.dateOfBirth ? employee?.dateOfBirth : ""
              }`}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-800" htmlFor="address">
              Dirección de domicilio:
            </label>
            <input
              id="address"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Dirección de domicilio"
              name="address"
              defaultValue={`${employee?.address ? employee?.address : ""}`}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-800" htmlFor="phone">
              Teléfono móvil:
            </label>
            <input
              id="phone"
              type="number"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Teléfono móvil"
              name="phone"
              defaultValue={`${employee?.phone ? employee?.phone : ""}`}
            />
          </div>
          <div className="mb-4">
            <label>
              Estado de Vacunación:{" "}
              <select
                name="vacunacionStatus"
                defaultValue="no vacunado"
                onChange={(e) => setStateVacunation(e.target.value)}
              >
                <option value="vacunado">Vacunado</option>
                <option value="no vacunado">No Vacunado</option>
              </select>
            </label>
          </div>
          {stateVacunation === "vacunado" ? (
            <div>
              <div className="mb-4">
                <label>
                  Tipo de vacunacion:{" "}
                  <select
                    name="vacunacionTipe"
                    defaultValue={`${
                      employee?.vacunacionTipe
                        ? employee?.vacunacionTipe
                        : "Sputnik"
                    }`}
                  >
                    <option value="Sputnik">Sputnik</option>
                    <option value="AstraZeneca">AstraZeneca</option>
                    <option value="Pfizer">Pfizer</option>
                    <option value="Jhonson&Jhonson">Jhonson&Jhonson</option>
                  </select>
                </label>
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="vaccinationDate">
                  Fecha de vacunación:
                </label>
                <input
                  id="vaccinationDate"
                  type="date"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Fecha de nacimiento"
                  name="vaccinationDate"
                  defaultValue={`${
                    employee?.vaccinationDate ? employee?.vaccinationDate : ""
                  }`}
                />
              </div>
              <div className="mb-4">
                <label>
                  Número de dosis:{" "}
                  <select
                    name="numberDoses"
                    defaultValue={`${
                      employee?.numberDoses
                        ? employee?.numberDoses
                        : "Una Dosis"
                    }`}
                  >
                    <option value="Una Dosis">Una Dosis</option>
                    <option value="Dos Dosis">Dos Dosis</option>
                    <option value="tres Dosis">tres Dosis</option>
                  </select>
                </label>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FormEmployee;
