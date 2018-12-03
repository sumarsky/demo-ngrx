import { TodoState, SelectableTodo } from './reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';

const getTodoState = createFeatureSelector<TodoState>('todos');

const getTodos =
  createSelector(
    getTodoState,
    state => state.todos);
const getFilter = createSelector(
  getTodoState,
  state => state.filter);
const getSelectedTodoIds = createSelector(
  getTodoState,
  state => state.selectedTodos);

const getFilteredTodos = createSelector(
  getTodos,
  getFilter,
  (todos, filter) => todos.filter(todo => todo.text.includes(filter) || todo.id.includes(filter))
);

export const getFilteredSelectableTodos = createSelector(
  getFilteredTodos,
  getSelectedTodoIds,
  (todos, selectedTodoIds) => todos
    .map(todo => new SelectableTodo(todo,
      selectedTodoIds.some(selectedTodo => todo.id === selectedTodo))));
