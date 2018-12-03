import { TodoState, SelectableTodo } from './reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';

const getTodoState = createFeatureSelector<TodoState>('todos');
export const getTodos = () =>
  createSelector(
    getTodoState,
    state => state.todos);

export const getSelectedTodos = () =>
  createSelector(getTodoState,
    state => state.todos
      .map(todo => new SelectableTodo(todo,
        state.selectedTodos
          .some(selectedTodo => todo.id === selectedTodo))));
