'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import loginUser from '../services/authService'; // Importamos la función loginUser para autenticar al usuario.
import LoginForm from '../components/LoginForm'; // Importamos el componente LoginForm.

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string>(''); // Estado para manejar los mensajes de error.
  const router = useRouter(); // Inicializamos el hook useRouter para redireccionar al usuario.

  // Función para manejar el inicio de sesión.
  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password); // Pasamos los parámetros directamente.
      localStorage.setItem('token', data.token); // Guardamos el token en localStorage para persistencia.
      router.push('/home'); // Redirigimos al usuario a la página de inicio tras el login exitoso.
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Si ocurre un error, lo mostramos al usuario.
      } else {
        setError('An unexpected error occurred'); // Mensaje genérico para errores inesperados.
      }
    }
  };

  return (
    <Container>
      <FormWrapper>
        <div>
          <Title>Iniciar sesión</Title> {/* Título de la página de inicio de sesión */}
        </div>
        {/* Formulario de inicio de sesión, pasamos la función handleLogin y el estado de error */}
        <LoginForm onSubmit={handleLogin} error={error} />
        <div className="text-center">
          {/* Enlace para redirigir a la página de registro */}
          <LoginLink href="/register">¿No tienes una cuenta? Regístrate</LoginLink>
        </div>
      </FormWrapper>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 3rem 1rem;
`;

const FormWrapper = styled.div`
  max-width: 28rem;
  width: 100%;
`;

const Title = styled.h2`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 800;
  color: #8a2bb0;
`;

const LoginLink = styled(Link)`
  font-size: 0.875rem;
  font-weight: 500;
  color: #8a2bb0;
  &:hover {
    color: #8a2bb0;
  }
`;

