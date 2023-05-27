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
                  style={
                    user.isActive
                      ? { ...styles.userItem, ...styles.activeUser }
                      : styles.userItem
                  }
                  onMouseEnter={() => handleMouseEnter(user.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div style={styles.userAvatarContainer}>
                    <img
                      src={user.photoUrl}
                      alt={user.username}
                      style={styles.userAvatar}
                    />
                    {hoveredUser === user.id && (
                      <FaEllipsisV style={styles.userOptions} />
                    )}
                  </div>
                  <div style={styles.userInfoContainer}>
                    <div style={styles.username}>{user.username}</div>
                    <div style={styles.lastMessage}>{user.lastMessage}</div>
                  </div>
                  {user.hasNewMessages && <div style={styles.newMessageDot} />}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={styles.chatContainer}>
          <div style={styles.chatHeader}>
            <div style={styles.chatHeaderInfo}>
              <img
                src={users[0].photoUrl}
                alt={users[0].username}
                style={styles.chatAvatar}
              />
              <div style={styles.chatUsername}>{users[0].username}</div>
            </div>
            <div style={styles.chatHeaderActions}>
              <FaEllipsisV style={styles.chatOptions} />
            </div>
          </div>
          <div style={styles.chatMessages}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={
                  message.isOwn ? styles.ownMessage : styles.otherMessage
                }
              >
                {message.content}
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} style={styles.chatInputContainer}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite uma mensagem..."
              style={styles.chatInput}
            />
            <button type="submit" style={styles.sendButton}>
              Enviar
            </button>
            <button style={styles.sendButton} onClick={handleLogout}>
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
    backgroundColor: '#ededed',
    color: 'white',
  },
  whatsappLogo: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  icons: {
    display: 'flex',
    width: '65px',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '15px',
    cursor: 'pointer',
  },
  messageIcon: {
    fontSize: '20px',
    color: '#999999',
    cursor: 'pointer',
  },
  menuIcon: {
    fontSize: '20px',
    cursor: 'pointer',
    color: '#999999',
  },
  content: {
    display: 'flex',
    flex: '1',
    borderRadius: '10px',
  },
  userListContainer: {
    flex: '0 0 375px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRight: '4px solid #ddd',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '16px',
    width: '100%',
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
    color: '#999999',
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
  userListTitle: {
    padding: '10px',
    fontWeight: 'bold',
    fontSize: '14px',
    textTransform: 'uppercase',
    borderBottom: '1px solid #ddd',
  },
  userList: {
    margin: '0',
    padding: '0',
    listStyleType: 'none',
  },
  userItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  activeUser: {
    backgroundColor: '#f5f5f5',
  },
  userAvatarContainer: {
    position: 'relative',
    marginRight: '10px',
  },
  userAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  userOptions: {
    position: 'absolute',
    top: '50%',
    right: '-10px',
    transform: 'translateY(-50%)',
    fontSize: '20px',
    color: '#aaa',
    cursor: 'pointer',
  },
  userInfoContainer: {
    flexGrow: 1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  username: {
    fontWeight: 'bold',
    fontSize: '14px',
    marginBottom: '3px',
  },
  lastMessage: {
    margin: '0',
    fontSize: '14px',
    color: '#999999',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  newMessageDot: {
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    backgroundColor: '#4caf50',
    marginLeft: '10px',
  },
  chatContainer: {
    flex: '2',
    display: 'flex',
    flexDirection: 'column',
  },
  chatHeader: {
    height: '60px',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
  },
  chatHeaderInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  chatAvatar: {
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  chatUsername: {
    fontWeight: 'bold',
  },
  chatHeaderActions: {},
  chatOptions: {
    fontSize: '24px',
    margin: '0 15px',
    cursor: 'pointer',
  },
  chatMessages: {
    flex: '1',
    padding: '20px',
    overflowY: 'auto',
  },
  ownMessage: {
    backgroundColor: '#dcf8c6',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  otherMessage: {
    backgroundColor: '#f5f5f5',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  chatInputContainer: {
    height: '60px',
    borderTop: '1px solid #ddd',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
  },
  chatInput: {
    flex: '1',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
  },
  sendButton: {
    marginLeft: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '10px 15px',
    cursor: 'pointer',
  },
};

export default ChatScreen;
