import { TodoActionTypes, TodoActions } from './actions';

export class Todo {
  id: number;
  text: string;

  constructor(_id: number, _text: string) {
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
  selectedTodos: Array<number>;
}
export const initialState: TodoState = {
  todos: [],
  selectedTodos: [5]
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
      let foo: Array<number>;
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

    default:
      return state;
  }
}
