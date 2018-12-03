import { Component, OnInit } from '@angular/core';
import { Observable, timer, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TodoState, Todo, SelectableTodo } from './state/reducer';
import { Store } from '@ngrx/store';
import * as todoActions from './state/actions';
import * as todoSelector from './state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos$: Observable<Array<SelectableTodo>>;
  click$: Subject<{ todo: Todo, select: boolean }> = new Subject();
  all$: Subject<boolean> = new Subject();

  constructor(private store: Store<TodoState>) { }

  ngOnInit(): void {
    const exTodos: Array<Todo> = [];
    for (let i = 0; i < 300; i++) {
      exTodos.push(new Todo(i, 'TODO - ' + i));
    }

    this.store.dispatch(new todoActions.Load(exTodos));
    this.todos$ = this.store.select(todoSelector.getSelectedTodos());
    this.all$.pipe().subscribe(b => this.store.dispatch(new todoActions.ToggleSelectAll(b)));
    this.click$.pipe(
      tap(console.log)
      // debounce(() => timer(500))
    ).subscribe(
      b => this.store.dispatch(new todoActions.ToggleSelect([b.todo, b.select])));
  }
}
