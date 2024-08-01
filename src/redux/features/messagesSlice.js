import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { toggleTraineeNewMessage } from './usersSlice';
import { toggleTrainerNewMessage } from './trainerSlice';

const initialState = {
  messages: [],
  relevantUsers: [],
  loading: false,
  error: null,
};

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (currentUserId, { rejectWithValue }) => {
    try {
      const messagesDocId = import.meta.env.VITE_MESSAGES_DOC_ID;
      const docRef = doc(db, 'messages', messagesDocId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const userIds = new Set();
        const messages = data.messages;

        messages.forEach((message) => {
          if (message.participants.includes(currentUserId)) {
            message.participants.forEach((participant) => {
              if (participant !== currentUserId) {
                userIds.add(participant);
              }
            });
          }
        });

        return { messages, relevantUsers: [...userIds] };
      } else {
        throw new Error('Messages document does not exist.');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrCreateConversation = createAsyncThunk(
  'messages/fetchOrCreateConversation',
  async ({ currentUserId, trainerId }, { rejectWithValue }) => {
    try {
      const messagesDocId = import.meta.env.VITE_MESSAGES_DOC_ID;
      const messagesRef = doc(db, 'messages', messagesDocId);
      const messagesDoc = await getDoc(messagesRef);

      if (messagesDoc.exists()) {
        const data = messagesDoc.data();
        const conversationExists = data.messages.some(
          (conv) =>
            conv.participants.includes(currentUserId) &&
            conv.participants.includes(trainerId)
        );
        if (!conversationExists) {
          await updateDoc(messagesRef, {
            messages: arrayUnion({
              participants: [currentUserId, trainerId],
              messages: [],
            }),
          });
        }
      } else {
        await setDoc(messagesRef, {
          messages: [
            {
              participants: [currentUserId, trainerId],
              messages: [],
            },
          ],
        });
      }
      return { currentUserId, trainerId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateMessages = createAsyncThunk(
  'messages/updateMessages',
  async ({ currentUserId, selectedUser, text }, { dispatch, getState, rejectWithValue }) => {
    try {
      const newMessage = {
        senderId: currentUserId,
        text,
        timestamp: new Date().toISOString(),
      };
      const messagesDocId = import.meta.env.VITE_MESSAGES_DOC_ID;
      const docRef = doc(db, 'messages', messagesDocId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const updatedMessages = data.messages.map((message) => {
          if (
            message.participants.includes(selectedUser) &&
            message.participants.includes(currentUserId)
          ) {
            return {
              ...message,
              messages: [...message.messages, newMessage],
            };
          }
          return message;
        });
        await updateDoc(docRef, { messages: updatedMessages });

        const { trainers } = getState().trainer;
        const isTrainerSending = trainers.some(
          (trainer) => trainer.uid === currentUserId
        );

        if (isTrainerSending) {
          dispatch(toggleTraineeNewMessage(true));
        } else {
          dispatch(toggleTrainerNewMessage(true));
        }

        return updatedMessages;
      } else {
        throw new Error('Messages document does not exist.');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload.messages;
        state.relevantUsers = action.payload.relevantUsers;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrCreateConversation.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(updateMessages.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default messagesSlice.reducer;
