import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { persistedAuthReducer } from './auth/auth.slice';
import { authInitState } from './auth/auth.init-state';
import { contactsInitState } from './contacts/contacts.init-state';
import { contactsReducer } from './contacts/contacts.slice';

const initState = {
  auth: authInitState,
  contacts: contactsInitState,
};

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    contacts: contactsReducer,
  },
  devTools: true,
  preloadedState: initState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
