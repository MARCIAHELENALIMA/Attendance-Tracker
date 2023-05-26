const styles = {
  container: {
    display: 'flex',
    alignItems: 'stretch',
    marginTop: '20px',
    background: '#f8f9fa', // Cor de fundo clara
    height: '100vh', // Altura total da tela
  },
  userListContainer: {
    flex: '0 0 auto',
    minWidth: '300px',
    padding: '10px',
    backgroundColor: '#f5f5f5', // Cor de fundo da lista de usuários
  },
  userListTitle: {
    margin: '0',
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#075e54', // Cor do título da lista de usuários
  },
  userList: {
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
  messageContainer: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff', // Cor de fundo da lista de mensagens
  },
  messageListTitle: {
    margin: '0',
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#075e54', // Cor do título da lista de mensagens
    padding: '10px',
    backgroundColor: '#075e54', // Cor de fundo do cabeçalho da lista de mensagens
    color: 'white', // Cor do texto do cabeçalho da lista de mensagens
  },
  messageList: {
    flex: '1',
    padding: '10px',
    overflowY: 'auto',
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
    <div style={styles.userListContainer}>
      <h3 style={styles.userListTitle}>Usuários Online:</h3>
      <ul style={styles.userList}>
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
    <div style={styles.messageContainer}>
      <h3 style={styles.messageListTitle}>Mensagens:</h3>
      <ul style={styles.messageList}>
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
  </div>
);