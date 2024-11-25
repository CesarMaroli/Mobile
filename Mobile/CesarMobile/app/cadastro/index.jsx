import React, { useState } from 'react';

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
    <div>
      <input name="nome" placeholder="Nome" onChange={handleChange} />
      <input name="sobrenome" placeholder="Sobrenome" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="senha" type="password" placeholder="Senha" onChange={handleChange} />
      <input name="telefone" placeholder="Telefone" onChange={handleChange} />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
};

export default FormularioUsuario;
