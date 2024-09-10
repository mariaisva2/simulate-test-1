
"use client" // Indica que este componente se ejecuta en el lado del cliente.

import React, { useEffect, useState } from 'react'; // Importamos React y los hooks useEffect y useState.
import styled from 'styled-components'; // Importamos styled-components para aplicar estilos.
import { useRouter } from 'next/navigation'; // Importamos useRouter de Next.js para manejar la navegación.



interface Post {
  id: number;
  title: string;
  description: string;
  likes: number;
  userHasLiked: boolean;
}

// Creamos una clase PostModel que implementa la interfaz Post.

class PostModel implements Post {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public likes: number,
    public userHasLiked: boolean
  ) {}
}

// Componente principal HomePage
const HomePage: React.FC = () => {
  const router = useRouter(); // Inicializamos el hook useRouter para redireccionar al usuario si es necesario.
  const [posts, setPosts] = useState<PostModel[]>([]); // Estado para almacenar los posts.
  const [title, setTitle] = useState(''); // Estado para el título del nuevo post.
  const [description, setDescription] = useState(''); // Estado para la descripción del nuevo post.
  const [error, setError] = useState(''); // Estado para almacenar mensajes de error.
  const [currentPostId, setCurrentPostId] = useState<number | null>(null); // ID del post en edición
  const [isEditing, setIsEditing] = useState(false); // Para controlar si estamos editando

  // useEffect para cargar los posts al montar el componente.
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Función para obtener los posts del backend.
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3060/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`, // Incluimos el token en la cabecera de la petición para autenticación.
          },
        });
        const data = await response.json(); // Parseamos la respuesta a JSON.
        const postsData = data.posts.map(
          (post: Post) =>
            new PostModel(post.id, post.title, post.description, post.likes, post.userHasLiked)
        );
        setPosts(postsData); // Cargamos todos los posts en el estado.
      } catch (error) {
        console.error('Error fetching posts:', error); // Manejo de errores en la obtención de posts.
      }
    };

    fetchPosts(); // Llamamos a la función para obtener los posts.
  }, [router]); // Este useEffect se ejecuta cuando el componente se monta o cuando cambia el router.


  // Función para manejar el agregado de un nuevo post.
  const handleAddPost = async () => {
    const token = localStorage.getItem('token');

    // Validamos que los campos título y descripción estén llenos.
    if (!title || !description) {
      setError('Por favor completa todos los campos.');
      return;
    }

    try {
      // Hacemos una petición POST al backend para agregar el nuevo post.
      const response = await fetch('http://localhost:3060/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indicamos que el contenido es JSON.
          Authorization: `Bearer ${token}`, // Incluimos el token en la cabecera de la petición.
        },
        body: JSON.stringify({
          title,
          description,
          user_id: 16, // Especificamos el user_id, asegurando que proviene de una fuente confiable.
        }),
      });

      if (response.ok) {
        const newPost = await response.json();
        setPosts([newPost, ...posts]); // Agregamos el nuevo post al inicio de la lista.
        setTitle(''); // Reseteamos el campo título.
        setDescription(''); // Reseteamos el campo descripción.
        setError(''); // Limpiamos cualquier error previo.
      } else {
        throw new Error('Error al agregar el post'); // Manejo de errores si la petición falla.
      }
    } catch (error) {
      console.error('Error adding post:', error); // Log de errores.
      setError('Error al agregar el post'); // Mostramos el error al usuario.
    }
  };

  // Función para manejar la edición de un post
  const handleEditPost = async () => {
    if (!title || !description || currentPostId === null) {
      setError('Por favor completa todos los campos.');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3060/api/posts/${setCurrentPostId}', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        // Actualizamos el estado del post editado
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === currentPostId ? new PostModel(post.id, title, description, post.likes, post.userHasLiked) : post
          )
        );
        setIsEditing(false);
        setCurrentPostId(null);
        setTitle(''); // Reseteamos el campo título
        setDescription(''); // Reseteamos el campo descripción
      } else {
        throw new Error('Error al editar el post');
      }
    } catch (error) {
      console.error('Error editing post:', error);
      setError('Error al editar el post');
    }
  };

  // Función para cargar el post en el formulario de edición
  const handleEdit = (post: PostModel) => {
    setCurrentPostId(post.id);
    setTitle(post.title);
    setDescription(post.description);
    setIsEditing(true);
  };

  // Función para manejar la eliminación de un post
  const handleDeletePost = async (id: number) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3060/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Eliminamos el post del estado
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      } else {
        throw new Error('Error al eliminar el post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Error al eliminar el post');
    }
  };



  function handleLike(id: number): void {
    throw new Error('Function not implemented.');
  }

  // Renderizamos el componente.
  return (
    <Container>
      <Title>Publicaciones</Title>
      <FormContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {isEditing ? (
          <Button onClick={handleEditPost}>Actualizar Post</Button>
        ) : (
          <Button onClick={handleAddPost}>Agregar Post</Button>
        )}
      </FormContainer>
      <PostsContainer>
        {posts.map((post) => (
          <PostCard key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <PostDescription>{post.description}</PostDescription>
            <LikeButton onClick={() => handleLike(post.id)}>
              {post.userHasLiked ? 'Unlike' : 'Like'} ({post.likes})
            </LikeButton>
            <EditButton onClick={() => handleEdit(post)}>Editar</EditButton>
            <DeleteButton onClick={() => handleDeletePost(post.id)}>Eliminar</DeleteButton>
          </PostCard>
        ))}
      </PostsContainer>
    </Container>
  );
};

export default HomePage;

// Estilos usando styled-components
const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
`;

const AddPostButton = styled.button`
  display: block;
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  background-color: #8a2bb0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2c5282;
  }
`;

const FormContainer = styled.form`
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #dddddd;
  border-radius: 8px;
  background-color: #f7fafc;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  background-color: #48bb78;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #38a169;
  }
`;

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const PostCard = styled.div`
  padding: 1rem;
  border: 1px solid #b013a9;
  border-radius: 8px;
  background-color: #fff;
`;

const PostTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #111;
`;

const PostDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #555;
`;

const LikeButton = styled.button`
  padding: 0.5rem 1rem;
  background-color:  #ef7ae9;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color:  #b013a9;
  }
    `;


const Button = styled.button`
background-color:  #b013a9;
color: white;
padding: 10px 15px;
border: none;
border-radius: 5px;
cursor: pointer;
font-size: 16px;
transition: background-color 0.3s ease;

&:hover {
  background-color: #dfaddc;
}

&:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(229, 97, 244, 0.5);
}
`;

// Mensaje de error
const ErrorMessage = styled.div`
color: red;
margin-bottom: 10px;
font-size: 14px;
text-align: center;
`;
const EditButton = styled(Button)`
  background-color: #ffc107; /* Color amarillo para el botón de editar */
  margin-left: 10px;

  &:hover {
    background-color: #e0a800;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545; /* Color rojo para el botón de eliminar */
  margin-left: 10px;

  &:hover {
    background-color: #c82333;
  }
`;



