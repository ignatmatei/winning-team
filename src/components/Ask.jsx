import { useParams, useNavigate } from 'react-router-dom';
import { useChats } from '../contexts/ChatsContext';
import styles from './Ask.module.css';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../contexts/FakeAuthContext';

function Ask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentChat,
    getChat,
    isLoading,
    addPromptToChat,
    createChat,
    dispatch,
  } = useChats();
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      getChat(id);
    } else {
      dispatch({ type: 'chat/emptyactive', payload: {} });
    }
  }, [id, getChat]);

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      // Call your function to handle sending the message here
      handleSendMessage();
    }
  };

  const handleKeyDownTitle = event => {
    if (event.key === 'Enter') {
      // Call your function to handle sending the message here
      handleCreateChat();
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      await addPromptToChat(id, inputValue);
      setInputValue(''); // Clear input value after sending
    }
  };

  const handleCreateChat = async () => {
    if (title.trim() !== '') {
      const newChat = {
        chatName: title,
        date: new Date().toISOString(),
        user,
        prompts: {},
        id: uuidv4(), // Generate a random ID

        // Include current time
      };
      await createChat(newChat);
      setTitle('');
      navigate(`/app/${newChat.id}`);
    }
  };

  if (!id) {
    return (
      <div className={styles.askContainer}>
        <div className={styles.midText}>
          <h1>Hello</h1>
          <h3>please enter a title</h3>
        </div>
        <div className={styles.inputBar}>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            onKeyDown={handleKeyDownTitle}
            placeholder="Enter chat title"
          />
        </div>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className={styles.askContainer}>
        <Spinner />
      </div>
    );

  return (
    <div className={styles.askContainer}>
      <br />
      {currentChat.prompts &&
        Object.keys(currentChat.prompts).map(key => {
          const prompt = currentChat.prompts[key];
          const isUserQuestion = key.startsWith('i-');
          return (
            <div
              key={key}
              className={`${styles.bubble} ${isUserQuestion ? styles.left : styles.right}`}
            >
              {prompt}
            </div>
          );
        })}
      <div className={styles.inputBar}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a new message..."
        />
      </div>
    </div>
  );
}

export default Ask;
