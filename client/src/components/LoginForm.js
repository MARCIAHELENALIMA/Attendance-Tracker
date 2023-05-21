import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar os dados de login para o servidor
      const response = await axios.post('http://localhost:8000/login', { cpf, senha });

      // Obter o token de autenticação do servidor
      const { token } = response.data;

      // Armazenar o token no local storage ou em algum estado global
      // ... código para armazenar o token ...

      // Redirecionar para a página de chat ou realizar alguma outra ação
      // ... código para redirecionar ou realizar ação desejada ...
    } catch (error) {
      setError('Erro ao realizar login. Verifique suas credenciais.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>CPF:</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            style={{ padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{ padding: '5px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
