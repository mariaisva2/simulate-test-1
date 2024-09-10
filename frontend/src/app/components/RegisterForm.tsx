//Este componente será responsable de capturar los datos del usuario (nombre, correo electrónico, contraseña).
"use client";
import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  margin-top: 2rem;
  space-y: 1.5rem;
`;

const InputGroup = styled.div`
  border-radius: 0.375rem;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  appearance: none;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
  color: #1f2937;
  font-size: 0.875rem;
  line-height: 1.25rem;
  &:focus {
    outline: none;
    ring-color: #6366f1;
    border-color: #6366f1;
    z-index: 10;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  color: white;
  background-color: #4f46e5;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #4338ca;
  }
  &:focus {
    outline: none;
    ring-color: #6366f1;
    ring-width: 2px;
    ring-offset-width: 2px;
  }
`;

const ErrorText = styled.div`
  color: #f56565;
  text-align: center;
`;

// Definición de la interfaz que describe las props que espera el componente RegisterForm
interface RegisterFormProps {
   
    onSubmit: (name: string, email: string, password: string) => void;

    error: string;
  }
  
  // Definición del componente RegisterForm como un Functional Component (React.FC)

  const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, error }) => {
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    // Manejador del evento de envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault(); 
      onSubmit(name, email, password); // Llamar a la función onSubmit que se pasó como prop, pasando los valores del nombre, email y contraseña
    };
  
    return (
      // Estructura del formulario
      <Form onSubmit={handleSubmit}>
        {error && <ErrorText>{error}</ErrorText>}
        <input type="hidden" name="remember" defaultValue="true" />
    
        <InputGroup>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Nombre"
            value={name} 
            onChange={(e) => setName(e.target.value)} // Actualizar el estado cuando se cambie el valor del nombre
          />
          <Input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Correo electrónico"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} // Actualizar el estado cuando se cambie el valor del email
          />
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Contraseña"
            value={password} // Valor actual de la contraseña
            onChange={(e) => setPassword(e.target.value)} // Actualizar el estado cuando se cambie el valor de la contraseña
          />
        </InputGroup>
      
        <SubmitButton type="submit">Registrarse</SubmitButton>
      </Form>
    );
  };
  
  export default RegisterForm;
