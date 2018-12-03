import { Component, OnInit } from '@angular/core';
import { Observable, timer, Subject } from 'rxjs';
import { tap, debounce } from 'rxjs/operators';

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
  search$: Subject<string> = new Subject();
  all$: Subject<boolean> = new Subject();

  constructor(private store: Store<TodoState>) { }

  ngOnInit(): void {
    const exTodos: Array<Todo> = [];
    for (let i = 0; i < 1000; i++) {
      exTodos.push(new Todo(Guid.newGuid(), 'TODO - ' + (i + 1)));
    }

    this.store.dispatch(new todoActions.Load(exTodos));
    this.todos$ = this.store.select(todoSelector.getFilteredSelectableTodos);
    this.all$.pipe().subscribe(value => this.store.dispatch(new todoActions.ToggleSelectAll(value)));
    this.search$.pipe(
      debounce(() => timer(300))
    ).subscribe(value => {
      this.store.dispatch(new todoActions.AddFilter(value));
    });
    this.click$.pipe(
    ).subscribe(
      param => this.store.dispatch(new todoActions.ToggleSelect([param.todo, param.select])));
  }
}

class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
