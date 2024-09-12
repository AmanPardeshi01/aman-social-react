import { legacy_createStore, applyMiddleware, combineReducers } from 'redux'; // Import createStore instead of legacy_createStore
import { thunk } from 'redux-thunk'; // Corrected import
import { authReducer } from './Auth/auth.reducer';
import { postReducer } from './Post/post.reducer';
import { messageReducer } from './Message/message.reducer';


// Combine reducers
const rootReducers = combineReducers({
    auth: authReducer,
    post: postReducer,
    message:messageReducer
});

// Create the Redux store with middleware
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk)); // Use createStore here
