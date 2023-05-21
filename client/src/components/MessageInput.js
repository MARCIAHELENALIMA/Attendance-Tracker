import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Digite sua mensagem"
        style={{
          marginRight: '10px',
          padding: '5px',
          width: '200px',
          borderRadius: '4px',
        }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px',
          borderRadius: '4px',
          border: 'none',
        }}
      >
        Enviar
      </button>
    </form>
  );
};

MessageInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};

export default MessageInput;
