import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:9000');

const ChatScreen = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado ao servidor de chat');
    });

    socket.on('message', ({ message, sender }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender },
      ]);
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

    if (selectedUser) {
      socket.emit('sendMessage', { message: newMessage, receiver: selectedUser.id });
      setNewMessage('');
    }
  };

  const handleLogout = () => {
    // Lógica para fazer logout e redirecionar para a página de login
    // ...

    history.push('/');
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', color: 'blue' }}>Tela de Chat</h2>
      <button
        style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '5px' }}
        onClick={handleLogout}
      >
        Sair
      </button>
      <div>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Usuários Online:</h3>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              style={{ marginBottom: '5px', cursor: 'pointer', color: user === selectedUser ? 'blue' : 'black' }}
              onClick={() => handleUserClick(user)}
            >
              {user.username} {user === selectedUser && '(selecionado)'}
            </li>
          ))}
        </ul>
      </div>
      {selectedUser ? (
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Mensagens:</h3>
          <ul>
            {messages.map((message, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                {message.sender === selectedUser.id ? (
                  <span style={{ fontWeight: 'bold' }}>{message.text}</span>
                ) : (
                  <span>{message.text}</span>
                )}
              </li>
            ))}
          </ul>
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem"
              style={{ width: '300px', padding: '5px' }}
            />
            <button
              type="submit"
              style={{ backgroundColor: 'green', color: 'white', padding: '5px', marginLeft: '10px' }}
              disabled={!newMessage.trim()}
            >
              Enviar
            </button>
          </form>
        </div>
      ) : (
        <div>Selecione um usuário para iniciar a conversa</div>
      )}
    </div>
  );
};

export default ChatScreen;
