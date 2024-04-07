import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useChats } from "../contexts/ChatsContext";
import BackButton from "./BackButton";
import styles from "./Chat.module.css";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function Chat() {
  const { id } = useParams();
  const { getChat, currentChat, isLoading } = useChats();

  useEffect(
    function () {
      getChat(id);
    },
    [id, getChat]
  );

  const { chatName, date } = currentChat;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.chat}>
      <div className={styles.row}>
        <h6>Chat name</h6>
        <h3>
          {chatName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You last worked on {chatName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${chatName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {chatName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default Chat;
