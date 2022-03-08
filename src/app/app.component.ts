import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from './store/models/book.model';
import { AppState } from './store/models/app-state.model';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AddBookAction, DeleteBookAction, UpdateBookAction } from './store/actions/book.action';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  books$: Observable<Array<Book>>;
  book: Book;
  showForm = false;
  public form: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder,) {
    this.createForm()
  }
  ngOnInit(): void {
    this.books$ = this.store.select((store) => store.book);
  }

  addBook(book: Book) {
    this.books$.subscribe(
      (res) => { 
       let ids = res.map( r => Number(r.id));
       let max = Math.max(...ids);
       book.id = (max + 1);
      }
    )
    this.store.dispatch(new AddBookAction(book));
    
  }
  deleteBook(book: Book){
    this.store.dispatch(new DeleteBookAction(book));
  }
  updateBook(book: Book){
    this.store.dispatch(new UpdateBookAction(book));
  }
  private createForm() {
    this.form = this.fb.group({
      id: [""],
      name: ["", [Validators.compose([Validators.required, Validators.minLength(3)] )]],
      description: ["", [Validators.compose([Validators.required, Validators.minLength(3)] )]]
  
     
    });
  }
  saveBook(){
    if (this.form.invalid) {
      return
    }
    if (this.book){
      this.updateBook(this.form.value);
    }else{
      let newBook : Book = this.form.value;
      this.addBook( newBook);
     
    }
    this.form.reset;
    this.showForm = false;
    this.book = null;
  }
  add(){
    this.book = null;
    this.form.reset();
    this.showForm = true;
  }
  selUpdateBook(book: Book) {
    this.book = book;
    this.form.reset();
    this.form.patchValue(book);
    this.showForm = true;
  }
}
