
import styles from "./ChatList.module.css";
import ChatItem from "./ChatItem";
import Message from "./Message";
import { useChats } from "../contexts/ChatsContext";

function groupChatsByMonth(chats) {
  const groupedChats = {};

  chats.forEach(chat => {
    const monthYear = new Date(chat.date).toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!groupedChats[monthYear]) {
      groupedChats[monthYear] = [chat];
    } else {
      groupedChats[monthYear].push(chat);
    }
  });

  return groupedChats;
}

function ChatList() {
  const { chats} = useChats();

  

  if (!chats.length)
    return (
      <Message message="Add your first chat by clicking on a chat on the map" />
    );

  const groupedChats = groupChatsByMonth(chats);

  return (
    <div className={styles.chatList}>
      {Object.entries(groupedChats).map(([monthYear, chats]) => (
        <div key={monthYear}>
          <h2>{monthYear}</h2>
          <ul>
            {chats.map(chat => (
              <ChatItem chat={chat} key={chat.id} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ChatList;