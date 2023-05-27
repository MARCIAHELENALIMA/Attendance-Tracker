import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
import usersData from './data';
import { FaEllipsisH, FaEllipsisV, FaEnvelope } from 'react-icons/fa';
import { InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <div style={styles.header}>
          <img
            style={styles.whatsappLogo}
            src="https://1.bp.blogspot.com/-seUOtdj1568/XrydIzx59MI/AAAAAAAAVdo/iZEzJtoiez06mk27kFv63mmz-xkHvBK-gCNcBGAsYHQ/s1600/selfie%2Bem%2Bcasa%2B7.jpg"
            alt="Márcia Helena"
          />
          <div style={styles.icons}>
            <FaEnvelope style={styles.messageIcon} />
            <FaEllipsisH style={styles.menuIcon} />
          </div>
        </div>
      </div>
      <div style={styles.content}>
        <div style={styles.userListContainer}>
          <div style={styles.headerRight}>
            <InputGroup style={styles.searchBar}>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
              </InputGroup.Text>
              <FormControl
                placeholder="Pesquisar ou começar uma nova conversa"
                className="full-width-input"
                style={styles.searchInput}
              />
            </InputGroup>
          </div>
          <div style={styles.userListTitle}>Conversas</div>
          <div>
            <ul style={styles.userList}>
              {users.map((user) => (
                <li
                  key={user.id}
                  className={`${styles.userListItem} ${hoveredUser === user.id ? styles.userListItemHover : ''
                    }`}
                  onMouseEnter={() => handleMouseEnter(user.id)}
                  onMouseLeave={() => handleMouseLeave(user.id)}
                >
                  <div style={styles.userAvatarContainer}>
                    <img style={styles.userAvatar} src={user.photoUrl} alt={user.username} />
                    {user.hasNewMessages && (
                      <div style={styles.newMessagesIndicator}>
                        <span style={styles.unreadMessagesCount}>{user.unreadMessages}</span>
                      </div>
                    )}
                    <div style={styles.userInfo}>
                      <h4 style={styles.username}>{user.username}</h4>
                      <p style={styles.lastMessage}>{user.lastMessage}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ ...styles.chatContainer, backgroundImage: 'url("https://marketplace.canva.com/EAFKIsxfWjI/1/0/1600w/canva-papel-de-parede-cora%C3%A7%C3%A3o-gradiente-bege-rosa-e-azul-eS21LuYsgUs.jpg")', }}>
          <div style={styles.chatHeader}>
            <h2 style={styles.chatTitle}>Nome do Contato</h2>
            <FaEllipsisV style={styles.chatMenuIcon} />
          </div>
          <div style={styles.messageList}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={message.isOwn ? styles.messageItemOwn : styles.messageItem}
              >
                <p style={styles.messageContent}>{message.content}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} style={styles.messageInputContainer}>
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
            <button style={styles.logoutButton} onClick={handleLogout}>
              Sair
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    flex: '0 0 auto',
    width: '375px', // Defina a largura desejada aqui
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#075e54',
    color: 'white',
  },
  unreadMessagesCount: {
    color: 'green',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  messageIcon: {
    fontSize: '20px',
    color: '#f8f9f',
  },
  lastMessage: {
    margin: '0',
    fontSize: '14px',
    color: '#999999',
  },
  icons: {
    display: 'flex',
    width: '65px',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '15px',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: '8px',
    padding: '4px',
    width: '100%',
  },
  searchIcon: {
    color: '#919191',
  },
  searchInput: {
    width: 'calc(100% - 55px)', // Ajuste a largura subtraindo o espaço da margem direita
    boxSizing: 'border-box',
    marginLeft: '10px',
    border: 'none',
    outline: 'none',
    backgroundColor: '#F4F4F4',
    borderRadius: '8px',
    fontSize: '14px',
  },
  whatsappLogo: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '16px',
    width: '100%',
  },
  menuIcon: {
    fontSize: '20px',
  },
  content: {
    display: 'flex',
    flex: '1',
  },
  userListContainer: {
    flex: '0 0 375px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRight: '4px solid #ddd',
    overflowY: 'auto', // Adicionado para permitir rolagem vertical
  },
  userListTitle: {
    margin: '0',
    padding: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#4a4a4a',
    borderBottom: '1px solid #ddd', // Adicionado para separar o título da lista
  },
  userList: {
    margin: '0',
    padding: '0',
    listStyleType: 'none',
  },
  userListItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    borderBottom: '1px solid #ddd', // Adicionado para separar os itens da lista
  },
  userListItemHover: {
    backgroundColor: '#f2f2f2',
  },
  userAvatarContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '10px',
    position: 'relative', // Adicionado para posicionar o indicador de novas mensagens
    borderBottom: '1px solid #ddd', // Adicionado para separar o título da lista
    padding: '10px',
  },
  userAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  newMessagesIndicator: {
    position: 'absolute',
    top: '50%',
    right: '-5px',
    transform: 'translateY(-50%)', // Adicionado para centralizar verticalmente
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#128c7e',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1', // Adicionado para ocupar o espaço disponível
  },
  username: {
    margin: '0',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#075e54',
  },
  status: {
    margin: '0',
    fontSize: '14px',
    color: '#999999',
  },
  chatContainer: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    backgroundImage: 'url("https://www.argali.com.br/wp-content/uploads/2017/09/WhatsApp.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  chatHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#075e54',
    color: 'white',
  },
  chatTitle: {
    margin: '0',
    fontSize: '16px',
  },
  chatMenuIcon: {
    fontSize: '20px',
  },
  messageList: {
    flex: '1',
    padding: '10px',
    overflowY: 'auto',
  },
  messageItem: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: '#e2ffc7',
  },
  messageItemOwn: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  messageContent: {
    margin: '0',
  },
  messageInputContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderTop: '1px solid #e0e0e0',
  },
  input: {
    flex: '1',
    minWidth: '0', // Adicione esta linha
    marginRight: '10px',
    padding: '5px',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
    outline: 'none',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#128c7e',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  logoutButton: {
    padding: '10px 15px',
    backgroundColor: '#128c7e',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
};

export default ChatScreen;
