import { LikeRequest, LikeResponse } from '../Interface/likes';

const BASE_URL = 'http://localhost:3060/api/likes';

// Función para añadir un "like" a un post
export const addLike = async (likeRequest: LikeRequest): Promise<LikeResponse> => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(likeRequest),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response data from addLike:', data); // Añade este log para depuración
    return data;
  } catch (error) {
    console.error('Error adding like:', error);
    throw error;
  }
};


// Función para obtener los likes de un post
export const getLikesForPost = async (postId: string): Promise<LikeResponse> => { // Cambia el tipo a string si `postId` es un string
  try {
    const response = await fetch(`${BASE_URL}?post_id=${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching likes for post:', error);
    throw error;
  }
};