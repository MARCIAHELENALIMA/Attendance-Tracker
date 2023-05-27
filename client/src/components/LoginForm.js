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
      const response = await axios.post('http://localhost:8000/', { cpf, senha });
      const { token } = response.data;

      // Armazenar o token no local storage ou em algum estado global
      localStorage.setItem('token', token);

      // Redirecionar para a página de chat
      history.push('/chat');
    } catch (error) {
      if (error.response) {
        // O servidor respondeu com um status de erro
        const { message } = error.response.data;
        setError(message); // Altere "message" para "error"
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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} className="border rounded p-4 bg-light" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4">Login</h2>
        {erro && <p className="text-danger mb-3">{erro}</p>}
        <div className="mb-3">
          <label htmlFor="cpf" className="form-label">CPF:</label>
          <input
            type="text"
            id="cpf"
            className="form-control"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            list="cpfOptions"
            autoComplete="off"
          />
          <datalist id="cpfOptions">
            <option value="123.456.789-00" />
            <option value="987.654.321-00" />
            <option value="111.222.333-44" />
          </datalist>
        </div>
        <div className="mb-3">
          <label htmlFor="senha" className="form-label">Senha:</label>
          <input
            type="password"
            id="senha"
            className="form-control"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-lg btn-block"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
