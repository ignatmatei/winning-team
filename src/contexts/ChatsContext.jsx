import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from 'react';

const BASE_URL = 'http://localhost:9000';

const ChatsContext = createContext();

const initialState = {
  chats: [],
  isLoading: false,
  currentChat: {},
  error: '',
};

function reducer(state, action) {
  let newChats;
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'chats/loaded':
      newChats = action.payload
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      return {
        ...state,
        isLoading: false,
        chats: newChats,
      };

    case 'chat/created':
      newChats = [...state.chats, action.payload].sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
      return {
        ...state,
        isLoading: false,
        chats: newChats,
        currentChat: action.payload,
      };

    case 'chat/loaded':
      return { ...state, isLoading: false, currentChat: action.payload };

    case 'chat/emptyactive':
      return { ...state, isLoading: false, currentChat: {} };

    case 'chat/deleted':
      return {
        ...state,
        isLoading: false,
        chats: state.chats.filter(chat => chat.id !== action.payload),
        currentChat: {},
      };

    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error('Unknown action type');
  }
}

function ChatsProvider({ children }) {
  const [{ chats, isLoading, currentChat, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(function () {
    async function fetchChats() {
      dispatch({ type: 'loading' });

      try {
        const res = await fetch(`${BASE_URL}/chats`);
        const data = await res.json();
        dispatch({ type: 'chats/loaded', payload: data });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading chats...',
        });
      }
    }
    fetchChats();
  }, []);

  const getChat = useCallback(
    async function getChat(id) {
      if (Number(id) === currentChat.id) return;

      dispatch({ type: 'loading' });

      try {
        const res = await fetch(`${BASE_URL}/chats/${id}`);
        const data = await res.json();
        dispatch({ type: 'chat/loaded', payload: data });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading the chat...',
        });
      }
    },
    [currentChat.id],
  );

  async function createChat(newChat) {
    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${BASE_URL}/chats`, {
        method: 'POST',
        body: JSON.stringify(newChat),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      dispatch({ type: 'chat/created', payload: data });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating the chat...',
      });
    }
  }

  async function deleteChat(id) {
    dispatch({ type: 'loading' });

    try {
      await fetch(`${BASE_URL}/chats/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: 'chat/deleted', payload: id });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting the chat...',
      });
    }
  }

  async function addPromptToChat(id, prompt) {
    try {
      // Fetch the existing chat data from the server
      const response = await fetch(`${BASE_URL}/chats/${id}`);
      const existingChat = await response.json();

      // Add the new prompt to the chat's prompts

      const updatedChat = {
        ...existingChat,
        prompts: {
          ...existingChat.prompts,
          [`i-${Object.keys(existingChat.prompts).length / 2 + 1}`]: prompt,
        },
      };

      // Send a PUT request to update the chat in the database
      const updateResponse = await fetch(`${BASE_URL}/chats/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedChat),
      });

      // Check if the request was successful (status code 200-299)
      if (updateResponse.ok) {
        // If successful, dispatch an action to update the state with the updated chat
        dispatch({ type: 'chat/loaded', payload: updatedChat });
        console.log(prompt);
        const updatePrompts = await fetch(
          'http://10.200.20.66:8082/api/get_response',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(prompt),
          },
        );
        console.log(updatePrompts);
      } else {
        // If the request was not successful, handle the error accordingly
        throw new Error('Failed to update chat with new prompt');
      }
    } catch (error) {
      // Handle any network errors or exceptions
      console.error('Error adding prompt to chat:', error.message);
      dispatch({
        type: 'rejected',
        payload: 'There was an error adding prompt to chat...',
      });
    }
  }

  return (
    <ChatsContext.Provider
      value={{
        chats,
        isLoading,
        currentChat,
        error,
        getChat,
        createChat,
        deleteChat,
        addPromptToChat,
        dispatch,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
}

function useChats() {
  const context = useContext(ChatsContext);
  if (context === undefined)
    throw new Error('ChatsContext was used outside the ChatsProvider');
  return context;
}

export { ChatsProvider, useChats };
