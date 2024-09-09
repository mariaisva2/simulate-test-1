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
// Esta clase se usa para manejar la lógica del modelo de datos.
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

  // useEffect para cargar los posts al montar el componente.
  useEffect(() => {
    // Verificamos si el token está en localStorage, si no, redirigimos al login.
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

  // Función para manejar el like/unlike en los posts.
  const handleLike = (id: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? new PostModel(
              post.id,
              post.title,
              post.description,
              post.userHasLiked ? post.likes - 1 : post.likes + 1, // Incrementamos o decrementamos los likes.
              !post.userHasLiked // Alternamos el estado de like/unlike.
            )
          : post
      )
    );
  };

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

      // Si la respuesta es correcta, agregamos el nuevo post a la lista de posts.
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

  // Renderizamos el componente.
  return (
    <Container>
      <Title>Publicaciones</Title>
      <FormContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>} {/* Si hay error, mostramos el mensaje */}
        <Input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Actualizamos el estado del título al cambiar.
        />
        <Input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Actualizamos el estado de la descripción al cambiar.
        />
        <Button onClick={handleAddPost}>Agregar Post</Button> {/* Botón para agregar un nuevo post */}
      </FormContainer>
      <PostsContainer>
        {posts.map((post) => (
          <PostCard key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <PostDescription>{post.description}</PostDescription>
            <LikeButton onClick={() => handleLike(post.id)}>
              {post.userHasLiked ? 'Unlike' : 'Like'} ({post.likes}) {/* Botón para dar like/unlike */}
            </LikeButton>
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
  background-color: #2b6cb0;
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
  border: 1px solid #ddd;
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
  border: 1px solid #ddd;
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
  background-color: #4c51bf;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #434190;
  }
    `;


const Button = styled.button`
background-color: #007bff;
color: white;
padding: 10px 20px;
border: none;
border-radius: 5px;
cursor: pointer;
font-size: 16px;
transition: background-color 0.3s ease;

&:hover {
  background-color: #0056b3;
}

&:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
}
`;

// Mensaje de error
const ErrorMessage = styled.div`
color: red;
margin-bottom: 10px;
font-size: 14px;
text-align: center;
`;



