'use client';

import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Page: React.FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <LeftContent>
          <Heading>Bienvenido a nuestra aplicación</Heading>
        </LeftContent>
        <RightContent>
          <StyledLink href="/login">Iniciar sesión</StyledLink>
          <RegisterLink href="/register">Registrarse</RegisterLink>
        </RightContent>
      </ContentWrapper>
    </Container>
  );
};

export default Page;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  background-color: #fec8f7;

  @media (min-width: 640px) {
    padding: 3rem 1.5rem; /* sm:px-6 */
  }

  @media (min-width: 1024px) {
    padding: 3rem 2rem; /* lg:px-8 */
  }
`;

const ContentWrapper = styled.div`
  max-width: 28rem; /* max-w-md */
  width: 100%;
  display: flex;
  justify-content: space-between; /* Título a la izquierda, botones a la derecha */
  align-items: center;
  gap: 1.5rem; /* space-y-6 */
`;

const LeftContent = styled.div`
  flex: 1; /* Ocupa el espacio a la izquierda */
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: row; /* Cambia a fila horizontal */
  align-items: center;
  justify-content: flex-end; /* Alinear a la derecha */
  gap: 1rem;
`;

const Heading = styled.h1`
  font-size: 2rem; /* text-3xl */
  font-weight: 700; /* font-extrabold */
  color: #111827; /* text-gray-900 */
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem; /* py-2 px-4 */
  border: 1px solid transparent;
  text-align: center;
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  border-radius: 0.375rem; /* rounded-md */
  color: #fff; /* text-white */
  background-color: #9d32be; /* bg-indigo-600 */
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #9d32be; /* hover:bg-indigo-700 */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #6366f1; /* focus:ring-indigo-500 */
  }
`;

const RegisterLink = styled(StyledLink)`
  background-color: #9d32be; /* bg-green-600 */
  
  &:hover {
    background-color: #9d32be; /* hover:bg-green-700 */
  }

  &:focus {
    box-shadow: 0 0 0 2px #34d399; /* focus:ring-green-500 */
  }
`;
