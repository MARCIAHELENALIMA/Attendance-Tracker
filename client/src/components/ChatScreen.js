import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:9000');

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
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Tela de Chat</h2>
        <button style={styles.logoutButton} onClick={handleLogout}>Sair</button>
      </div>
      <div style={styles.userList}>
        <h3 style={styles.userListTitle}>Usuários Online:</h3>
        <ul style={styles.userListContainer}>
          {users.map((user) => (
            <li key={user.id} style={styles.userListItem}>{user.username}</li>
          ))}
        </ul>
      </div>
      <div style={styles.messageList}>
        <h3 style={styles.messageListTitle}>Mensagens:</h3>
        <ul style={styles.messageListContainer}>
          {messages.map((message, index) => (
            <li key={index} style={styles.messageListItem}>{message}</li>
          ))}
        </ul>
      </div>
      <form style={styles.messageForm} onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Enviar</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '10px',
    backgroundColor: '#075e54',
    color: 'white',
  },
  title: {
    fontSize: '20px',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
  },
  userList: {
    width: '300px',
    padding: '10px',
    backgroundColor: '#ededed',
  },
  userListTitle: {
    margin: '0',
  },
  userListContainer: {
    margin: '0',
    padding: '0',
    listStyleType: 'none',
  },
  userListItem: {
    marginBottom: '5px',
  },
  messageList: {
    width: '400px',
    padding: '10px',
    backgroundColor: 'white',
  },
  messageListTitle: {
    margin: '0',
  },
  messageListContainer: {
    margin: '0',
    padding: '0',
    listStyleType: 'none',
  },
  messageListItem: {
    marginBottom: '5px',
  },
  messageForm: {
    display: 'flex',
    marginTop: '10px',
  },
  input: {
    marginRight: '10px',
    padding: '5px',
    width: '300px',
  },
  button: {
    padding: '5px 10px',
    backgroundColor: '#075e54',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};


export default ChatScreen;