// Función para registrar un nuevo usuario
const registerUser = async (name: string, email: string, password: string) => {
  // Realizamos una petición POST a la API de autenticación en la ruta /register
  const response = await fetch('http://localhost:3060/api/auth/register', {
    method: 'POST', // Método de la petición
    headers: { 'Content-Type': 'application/json' }, // Indicamos que los datos se envían en formato JSON
    body: JSON.stringify({ name, email, password }), // Convertimos el nombre, email y password en un string JSON para enviarlo en el cuerpo de la petición
  });

  if (!response.ok) {
    const errorData = await response.json(); 
    throw new Error(errorData.message || 'Error en el registro'); 
  }

  return response.json(); 
};

export default registerUser;
  