import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se os campos estão preenchidos
    if (!cpf || !senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/login', { cpf, senha });
      const { token } = response.data;

      // Armazenar o token no local storage ou em algum estado global
      localStorage.setItem('token', token);

      // Redirecionar para a página de chat
      history.push('/chat');
    } catch (error) {
      if (error.response) {
        // O servidor respondeu com um status de erro
        const { message } = error.response.data;
        setError(message);
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta do servidor
        setError('Erro ao realizar a requisição. Verifique sua conexão com a internet.');
      } else {
        // Ocorreu um erro ao configurar a requisição
        setError('Erro ao configurar a requisição.');
      }
    }
  };

  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2 style={{ marginBottom: '20px' }}>Login</h2>
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
        <div style={{ marginBottom: '10px', textAlign: 'left' }}>
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            list="cpfOptions"
            autoComplete="off"
            style={{ padding: '5px', width: '100%', border: '1px solid #ccc', borderRadius: '3px' }}
          />
          <datalist id="cpfOptions">
            <option value="123.456.789-00" />
            <option value="987.654.321-00" />
            <option value="111.222.333-44" />
          </datalist>
        </div>
        <div style={{ marginBottom: '10px', textAlign: 'left' }}>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{ padding: '5px', width: '100%', border: '1px solid #ccc', borderRadius: '3px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#ff69b4',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
