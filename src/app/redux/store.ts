import { createStore } from 'redux';
import { booksReducer } from './books-state';

const store = createStore(booksReducer);

export default store;