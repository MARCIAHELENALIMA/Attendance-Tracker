import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io(API_BASE_URL);

const ChatScreen = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado ao servidor de chat');
    });

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('userList', (userList) => {
      setUsers(userList);
    });

    socket.on('disconnect', () => {
      console.log('Desconectado do servidor de chat');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();

    socket.emit('sendMessage', newMessage);

    setNewMessage('');
  };

  const handleLogout = () => {
    // Lógica para fazer logout e redirecionar para a página de login
    // ...

    history.push('/');
  };

  return (
    <div>
      <h2>Tela de Chat</h2>
      <button onClick={handleLogout}>Sair</button>
      <div>
        <h3>Usuários Online:</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Mensagens:</h3>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ChatScreen;
