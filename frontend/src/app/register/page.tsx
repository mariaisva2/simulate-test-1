'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import RegisterForm from '../components/RegisterForm';
import registerUser from '../services/registerService';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  padding: 3rem 1rem;
`;

const FormWrapper = styled.div`
  max-width: 28rem;
  width: 100%;
  space-y: 2rem;
`;

const Title = styled.h2`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 800;
  color: #8a2bb0;
`;

const LoginLink = styled.a`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4f46e5;
  &:hover {
    color: #8a2bb0;
  }
`;

const RegisterPage: React.FC = () => {
  const [error, setError] = useState<string>(''); // Estado para manejar los mensajes de error.
  const router = useRouter(); // Inicializamos el hook useRouter para redireccionar al usuario.

  // Función para manejar el registro.
  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      await registerUser(name, email, password); // Llamamos a la función registerUser para registrar al usuario.
      router.push('/login'); // Redirigimos al usuario a la página de inicio de sesión tras el registro exitoso.
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // Si ocurre un error, lo mostramos al usuario.
      } else {
        setError('An unexpected error occurred'); // Mensaje genérico para errores inesperados.
      }
    }
  };

  return (
    <Container>
      <FormWrapper>
        <div>
          <Title>Crear una cuenta</Title> {/* Título de la página de registro */}
        </div>
        <RegisterForm onSubmit={handleRegister} error={error} />
        <div className="text-center">
          {/* Enlace para redirigir a la página de inicio de sesión */}
          <LoginLink href="/login">¿Ya tienes una cuenta? Inicia sesión</LoginLink>
        </div>
      </FormWrapper>
    </Container>
  );
};
export default RegisterPage;
