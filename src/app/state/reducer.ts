import { TodoActionTypes, TodoActions } from './actions';

export class Todo {
  id: string;
  text: string;

  constructor(_id: string, _text: string) {
    this.id = _id;
    this.text = _text;
  }
}
export class SelectableTodo extends Todo {
  isSelected: boolean;
  constructor(todo: Todo, selected: boolean) {
    super(todo.id, todo.text);
    this.isSelected = selected;
  }
}

export interface TodoState {
  todos: Array<Todo>;
  selectedTodos: Array<string>;
  filter: string;
}
export const initialState: TodoState = {
  todos: [],
  selectedTodos: [],
  filter: ''
};

export function todoReducer(state = initialState, action: TodoActions): TodoState {
  Object.freeze(state);

  switch (action.type) {
    case TodoActionTypes.Load:
      return {
        ...state,
        todos: action.payload
      };

    case TodoActionTypes.ToggleSelect:
      let foo: Array<string>;
      if (action.payload[1]) {
        foo = state.selectedTodos.concat(action.payload[0].id);
      } else {
        foo = state.selectedTodos.filter(x => x !== action.payload[0].id);
      }

      return {
        ...state,
        selectedTodos: foo
      };

    case TodoActionTypes.ToggleSelectAll:
      return {
        ...state,
        selectedTodos: action.payload.valueOf() ? state.todos.map(x => x.id) : []
      };

    case TodoActionTypes.AddFilter:
      return {
        ...state,
        filter: action.payload
      };

    default:
      return state;
  }
}
