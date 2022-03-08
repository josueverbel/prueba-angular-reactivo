import { Book } from './book.model';

export interface AppState {
  readonly book: Array<Book>;
}
