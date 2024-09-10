// URL base de la API para la autenticación
const API_URL = 'http://localhost:3060/api/auth';


const loginUser = async (email: string, password: string) => {
  // Realizamos una petición POST a la API de autenticación en la ruta /login
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST', // Método de la petición
    headers: { 'Content-Type': 'application/json' }, // Indicamos que los datos se envían en formato JSON
    body: JSON.stringify({ email, password }), 
  });
  // Si la respuesta no es satisfactoria (código de estado no en el rango 200-299)
  if (!response.ok) {
    const errorData = await response.json(); 
    throw new Error(errorData.message || 'Error en el inicio de sesión'); 
  }

  return response.json(); 
};

export default loginUser; 
