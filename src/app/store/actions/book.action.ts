import { Action } from '@ngrx/store';
import { Book } from '../models/book.model';

export interface IBookAction {
  readonly type : BookActionType;
  payload: Book
}
export enum BookActionType {
  ADD_BOOK = '[BOOK] Add Book',
  DELETE_BOOK = '[BOOK] Deelete Book',
  UPDATE_BOOK = '[BOOK] Update Book',
}

export class AddBookAction implements Action {
  readonly type = BookActionType.ADD_BOOK;

  constructor(public payload: Book) {}
}

export class DeleteBookAction implements Action {
  readonly type = BookActionType.DELETE_BOOK;
  constructor(public payload: Book) {}
}
export class UpdateBookAction implements Action {
  readonly type = BookActionType.UPDATE_BOOK;
  constructor(public payload: Book) {}
}
