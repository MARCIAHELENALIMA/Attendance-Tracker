import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
import MessageInput from './MessageInput';
import usersData from './data';
import { FaCircle, FaEllipsisH, FaSearch } from 'react-icons/fa';


const socket = io('http://localhost:9000');

const ChatScreen = () => {
  const history = useHistory();
  const [users, setUsers] = useState(usersData);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [hoveredUser, setHoveredUser] = useState(null);

  const handleMouseEnter = (userId) => {
    setHoveredUser(userId);
  };

  const handleMouseLeave = () => {
    setHoveredUser(null);
  };
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado ao servidor de chat');
    });

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('userList', (userList) => {
      const updatedUserList = userList.map((user) => {
        return {
          ...user,
          isActive: user.id === socket.id,
          hasNewMessages: false,
        };
      });
      setUsers(updatedUserList);
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

    const message = {
      content: newMessage,
      isOwn: true,
    };

    socket.emit('sendMessage', message);

    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage('');
  };

  const handleLogout = () => {
    // Lógica para fazer logout e redirecionar para a página de login
    // ...

    history.push('/');
  };

  return (
    <>
      <div style={styles.header}>
        <h2 style={styles.title}>Tela de Chat</h2>
      </div>
      <div style={styles.container}>
        <div style={styles.header}>
          {/* Elementos do cabeçalho */}
          <div style={styles.headerLeft}>
            <img style={styles.whatsappLogo} src="caminho/para/seu/logo.png" alt="Logo do WhatsApp" />
            <div style={styles.statusIndicatorContainer}>
              <FaCircle style={styles.statusIndicator} />
            </div>
          </div>
          <div style={styles.headerRight}>
            <FaEllipsisH style={styles.menuIcon} />
          </div>
        </div>
        <div style={styles.searchBar}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Pesquisar ou começar novas conversas"
            style={styles.searchInput}
          />
          <div style={styles.userListContainer}>
            <h3 style={styles.userListTitle}>Usuários Online:</h3>
            <ul style={styles.userList}>
              {users.map((user) => (
                <li
                  key={user.id}
                  className={`${styles.userListItem} ${hoveredUser === user.id ? styles.userListItemHover : ""}`}
                  onMouseEnter={() => handleMouseEnter(user.id)}
                  onMouseLeave={() => handleMouseLeave(user.id)}
                >
                  <div style={styles.userAvatarContainer}>
                    <img style={styles.userAvatar} src={user.photoUrl} alt={user.username} />
                    {user.hasNewMessages && <div style={styles.newMessagesIndicator} />}
                  </div>
                  <div style={styles.userInfo}>
                    <h4 style={styles.username}>{user.username}</h4>
                    <p style={styles.status}>{user.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div style={styles.messageContainer}>
            <h3 style={styles.messageListTitle}>Mensagens:</h3>
            <ul style={styles.messageList}>
              {messages.map((message, index) => (
                <li
                  key={index}
                  style={
                    message.isOwn
                      ? styles.messageListItemOwn
                      : styles.messageListItem
                  }
                >
                  {message.content}
                </li>
              ))}
            </ul>
            <div style={styles.buttonContainer}>
              <MessageInput onSendMessage={handleSendMessage} />
              <form onSubmit={handleSendMessage}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite sua mensagem"
                  style={styles.input}
                />
                <button type="submit" style={styles.button}>
                  Enviar
                </button>
              </form>
              <button style={styles.logoutButton} onClick={handleLogout}>
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
 }  

const styles = {
  container: {
    display: "flex",
    alignItems: "stretch",
    marginTop: "20px",
    background: "#f8f9fa", // Cor de fundo clara
    height: "100vh", // Altura total da tela
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // Alinhar espaço entre os elementos
    width: "100%",
    padding: "10px",
    backgroundColor: "#075e54", // Cor do cabeçalho do WhatsApp
    color: "white",
  },
  title: {
    fontSize: "20px",
    margin: "0", // Adicionado margem zero
  },
  buttonContainer: {
    display: "flex", // Adicionado display flex
    alignItems: "center", // Alinhar verticalmente
  },
  logoutButton: {
    padding: "5px 10px",
    backgroundColor: "#128c7e", // Cor do botão de sair
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px", // Espaçamento à esquerda
  },
  userListContainer: {
    flex: "0 0 300px",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRight: "1px solid #ddd",
  },
  userListTitle: {
    margin: "0",
    padding: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#4a4a4a",
  },

  userList: {
    margin: "0",
    padding: "0",
    listStyleType: "none",
  },
  userListItemActive: {
    marginBottom: "5px",
    padding: "5px 10px",
    borderRadius: "5px",
    backgroundColor: "#075e54", // Cor de fundo dos itens da lista de usuários ativos
    color: "#fff", // Cor do texto dos itens da lista de usuários ativos
    cursor: "pointer",
  },
  messageContainer: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff", // Cor de fundo da lista de mensagens
  },
  messageListTitle: {
    margin: "0",
    marginBottom: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#075e54", // Cor do título da lista de mensagens
    padding: "10px",
    backgroundColor: "#075e54", // Cor de fundo do cabeçalho da lista de mensagens
  },
  messageList: {
    flex: "1",
    padding: "10px",
    overflowY: "auto",
  },
  messageListItem: {
    marginBottom: "5px",
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: "#e2ffc7", // Cor de fundo dos itens da lista de mensagens
  },
  messageListItemOwn: {
    marginBottom: "5px",
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: "#dcf8c6", // Cor de fundo das próprias mensagens
    alignSelf: "flex-end", // Alinhar à direita
  },
  messageForm: {
    display: "flex",
    backgroundColor: "#f8f9fa", // Cor de fundo do formulário
    padding: "10px",
    borderTop: "1px solid #e0e0e0", // Linha superior do formulário
  },
  input: {
    flex: "1",
    marginRight: "10px",
    padding: "5px",
    border: "1px solid #e0e0e0", // Borda do campo de entrada
    borderRadius: "5px",
    outline: "none", // Remove a borda de foco
  },
  button: {
    padding: "5px 10px",
    backgroundColor: "#128c7e", // Cor do botão de enviar
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  userAvatarContainer: {
    display: "flex",
    alignItems: "center",
    marginRight: "10px", // Espaçamento à direita
    position: "relative", // Para posicionar o indicador de novas mensagens
  },
  userAvatar: {
    width: "50px", // Largura da imagem do usuário
    height: "50px", // Altura da imagem do usuário
    borderRadius: "50%", // Forma arredondada para a foto do usuário
    marginRight: "10px",
  },
  newMessagesIndicator: {
    position: "absolute",
    top: "-5px", // Posicionamento em relação ao topo
    right: "-5px", // Posicionamento em relação à direita
    width: "10px", // Largura do indicador
    height: "10px", // Altura do indicador
    borderRadius: "50%", // Forma arredondada para o indicador
    backgroundColor: "#128c7e", // Cor do indicador de novas mensagens
  },
  userInfo: {
    flex: "1", // Ocupar espaço restante horizontalmente
  },
  username: {
    margin: "0",
    fontSize: "16px", // Tamanho da fonte do nome de usuário
    fontWeight: "bold", // Negrito para o nome de usuário
    color: "#075e54", // Cor do nome de usuário
  },
  status: {
    margin: "0",
    fontSize: "14px",
    color: "#999999",
  },

  userListItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  userListItemHover: {
    backgroundColor: "#f2f2f2",
  },
  
};

export default ChatScreen;