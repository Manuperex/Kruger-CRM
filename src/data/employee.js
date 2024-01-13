export async function getEmployees() {
  const response = await fetch(import.meta.env.VITE_API_URL);
  const result = response.json();
  return result;
}

export async function getEmployee(id) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
    const result = response.json();
    return result;
  } catch (error) {
    throw new error();
  }
}

export async function getEmployeeByEmail(email) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}?email=${encodeURIComponent(email)}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export async function postEmployee(data) {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function updateEmployee(id, data) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(email, data) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}?email=${encodeURIComponent(email)}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      return await response.json();
    } else if (response.status === 404) {
      console.warn("Usuario no encontrado");
      return null;
    } else {
      console.error("Error HTTP al actualizar el usuario:", response.status);
      throw new Error(`Error HTTP: ${response.status}`);
    }
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
}

export async function deleteEmployee(id) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "DELETE",
    });
    await response.json();
  } catch (error) {
    console.log(error);
  }
}
