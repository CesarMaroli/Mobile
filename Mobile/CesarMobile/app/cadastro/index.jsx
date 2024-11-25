import React, { useState } from 'react';
import styled from 'styled-components';

const FormularioUsuario = () => {
  const [form, setForm] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    telefone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        console.log('Usuário cadastrado com sucesso!');
      } else {
        console.error('Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
    }
  };

  return (
    <Form>
      <Input name="nome" placeholder="Nome" onChange={handleChange} />
      <Input name="sobrenome" placeholder="Sobrenome" onChange={handleChange} />
      <Input name="email" placeholder="Email" onChange={handleChange} />
      <Input name="senha" type="password" placeholder="Senha" onChange={handleChange} />
      <Input name="telefone" placeholder="Telefone" onChange={handleChange} />
      <Button onClick={handleSubmit}>Enviar</Button>
    </Form>
  );
};
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  background-color: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// Estilos para os inputs
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: #888;
    font-style: italic;
  }
`;

// Estilos para o botão
const Button = styled.button`
  padding: 12px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export default FormularioUsuario;
