import { Link, useNavigate } from 'react-router-dom';
import { useChats } from '../contexts/ChatsContext';
import styles from './ChatItem.module.css';

const formatDate = date =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

function ChatItem({ chat }) {
  const { currentChat, deleteChat } = useChats();
  const { chatName, date, id } = chat;
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    deleteChat(id);
    navigate('/app');
  }

  return (
    <li>
      <Link
        className={`${styles.chatItem} ${
          id === currentChat.id ? styles['chatItem--active'] : ''
        }`}
        to={`${id}`}
      >
        <h3 className={styles.name}>{chatName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default ChatItem;
