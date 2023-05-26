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

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px',
      background: '#f8f9fa', // Cor de fundo clara
      height: '100vh', // Altura total da tela
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between', // Alinhar espaço entre os elementos
      width: '100%',
      padding: '10px',
      backgroundColor: '#075e54', // Cor do cabeçalho do WhatsApp
      color: 'white',
    },
    title: {
      fontSize: '20px',
    },
    buttonContainer: {
      display: 'flex', // Adicionado display flex
      alignItems: 'center', // Alinhar verticalmente
    },
    logoutButton: {
      padding: '5px 10px',
      backgroundColor: '#128c7e', // Cor do botão de enviar
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginLeft: '10px', // Espaçamento à esquerda
    },
    userList: {
      flex: '1',
      minWidth: '300px',
      padding: '10px',
      backgroundColor: '#f5f5f5', // Cor de fundo da lista de usuários
      overflowY: 'scroll', // Adiciona barra de rolagem vertical se necessário
    },
    userListTitle: {
      margin: '0',
      marginBottom: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#075e54', // Cor do título da lista de usuários
    },
    userListContainer: {
      margin: '0',
      padding: '0',
      listStyleType: 'none',
    },
    userListItem: {
      marginBottom: '5px',
      padding: '5px 10px',
      borderRadius: '5px',
      backgroundColor: '#fff', // Cor de fundo dos itens da lista de usuários
      color: '#075e54', // Cor do texto dos itens da lista de usuários
      cursor: 'pointer',
    },
    userListItemActive: {
      marginBottom: '5px',
      padding: '5px 10px',
      borderRadius: '5px',
      backgroundColor: '#075e54', // Cor de fundo dos itens da lista de usuários ativos
      color: '#fff', // Cor do texto dos itens da lista de usuários ativos
      cursor: 'pointer',
    },
    messageList: {
      flex: '1',
      minWidth: '400px',
      padding: '10px',
      backgroundColor: '#fff', // Cor de fundo da lista de mensagens
      overflowY: 'scroll', // Adiciona barra de rolagem vertical se necessário
    },
    messageListTitle: {
      margin: '0',
      marginBottom: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#075e54', // Cor do título da lista de mensagens
    },
    messageListContainer: {
      margin: '0',
      padding: '0',
      listStyleType: 'none',
    },
    messageListItem: {
      marginBottom: '5px',
      padding: '10px',
      borderRadius: '10px',
      backgroundColor: '#e2ffc7', // Cor de fundo dos itens da lista de mensagens
    },
    messageListItemOwn: {
      marginBottom: '5px',
      padding: '10px',
      borderRadius: '10px',
      backgroundColor: '#dcf8c6', // Cor de fundo das próprias mensagens
      alignSelf: 'flex-end', // Alinhar à direita
    },
    messageForm: {
      display: 'flex',
      marginTop: '10px',
      backgroundColor: '#f8f9fa', // Cor de fundo do formulário
      padding: '10px',
      borderTop: '1px solid #e0e0e0', // Linha superior do formulário
    },
    input: {
      flex: '1',
      marginRight: '10px',
      padding: '5px',
      border: '1px solid #e0e0e0', // Borda do campo de entrada
      borderRadius: '5px',
      outline: 'none', // Remove a borda de foco
    },
    button: {
      padding: '5px 10px',
      backgroundColor: '#128c7e', // Cor do botão de enviar
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Tela de Chat</h2>
      </div>
      <div style={styles.userList}>
        <h3 style={styles.userListTitle}>Usuários Online:</h3>
        <ul style={styles.userListContainer}>
          {users.map((user) => (
            <li
              key={user.id}
              style={
                user.isActive ? styles.userListItemActive : styles.userListItem
              }
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.messageList}>
        <h3 style={styles.messageListTitle}>Mensagens:</h3>
        <ul style={styles.messageListContainer}>
          {messages.map((message, index) => (
            <li
              key={index}
              style={
                message.isOwn ? styles.messageListItemOwn : styles.messageListItem
              }
            >
              {message.content}
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.buttonContainer}>
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem"
              style={styles.input}/>
            <button type="submit" style={styles.button}>
              Enviar
            </button>
          </form>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Sair
          </button>
        </div>
    </div>
  );
}
 

export default ChatScreen;