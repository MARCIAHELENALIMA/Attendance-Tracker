import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Substitua com a URL correta do servidor back-end

const ChatScreen = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Conectar ao servidor de chat usando Socket.IO
    socket.on('connect', () => {
      console.log('Conectado ao servidor de chat');
    });

    // Lidar com a recepção de mensagens do servidor
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Lidar com a atualização da lista de usuários online
    socket.on('userList', (userList) => {
      setUsers(userList);
    });

    // Lidar com a desconexão do servidor de chat
    socket.on('disconnect', () => {
      console.log('Desconectado do servidor de chat');
    });

    // Retornar uma função de limpeza para desconectar o socket quando o componente for desmontado
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();

    // Enviar a nova mensagem para o servidor
    socket.emit('sendMessage', newMessage);

    // Limpar o campo de entrada de mensagem
    setNewMessage('');
  };

  return (
    <div>
      <h2>Tela de Chat</h2>
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
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChatScreen;
