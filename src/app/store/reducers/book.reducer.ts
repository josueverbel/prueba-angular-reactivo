// // import the interface
import { Book } from '../models/book.model';
import { BookActionType, IBookAction } from '../actions/book.action';
// //create a dummy initial state

const initialState: Array<Book> = [
  {
    id: 1,
    description: 'Cien años de soledad',
    name: 'Nobel de Garcia Marquez',
  },
];

export function BookReducer(
  state: Array<Book> = initialState,
  action: IBookAction
) {
  switch (action.type) {
    case BookActionType.ADD_BOOK:
      return [...state, action.payload];
     
    case BookActionType.DELETE_BOOK:
      
    return [...state.filter(book => book !== action.payload)];
    case BookActionType.UPDATE_BOOK:
    
    return [...state.filter(book => book.id !== action.payload.id), action.payload];
    default:
      return state;
  }
}
