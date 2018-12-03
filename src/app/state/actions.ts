import { Action } from '@ngrx/store';
import { Todo } from './reducer';

export enum TodoActionTypes {
  Load = '[TODO] Load',
  ToggleSelect = '[TODO] ToggleSelect',
  ToggleSelectAll = '[TODO] ToggleSelectAll'
}

export class Load implements Action {
  readonly type = TodoActionTypes.Load;
  constructor(public payload: Array<Todo>) { }
}

export class ToggleSelect implements Action {
  readonly type = TodoActionTypes.ToggleSelect;
  constructor(public payload: [Todo, boolean]) { }
}

export class ToggleSelectAll implements Action {
  readonly type = TodoActionTypes.ToggleSelectAll;
  constructor(public payload: boolean) { }
}
export type TodoActions = Load | ToggleSelect | ToggleSelectAll;
