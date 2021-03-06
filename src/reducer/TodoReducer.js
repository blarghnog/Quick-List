import { DateBinarySearch } from "../functions/DateBinarySearch";
const shortid = require("shortid");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export const INITIAL_STATE = {
  todos: [],
  calendarDate: dayjs().format("M-D-YYYY"),
};

export const TodoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      if (state.todos.length > 0) {
        const newTodos = [...state.todos];
        newTodos.splice(
          DateBinarySearch(newTodos, dayjs(state.calendarDate, "M-D-YYYY")),
          0,
          {
            title: action.newTitle,
            text: "",
            location: "",
            date: state.calendarDate,
            isCompleted: false,
            id: shortid.generate(),
          }
        );
        return {
          todos: newTodos,
          calendarDate: state.calendarDate,
        };
      } else {
        return {
          todos: [
            {
              title: action.newTitle,
              text: "",
              location: "",
              date: state.calendarDate,
              isCompleted: false,
              id: shortid.generate(),
            },
            ...state.todos,
          ],
          calendarDate: state.calendarDate,
        };
      }
    case "DELETE_TODO":
      return {
        todos: [...state.todos.filter((todo) => todo.id !== action.deleteId)],
        calendarDate: state.calendarDate,
      };
    case "EDIT_TODO":
      if (state.todos.length <= 1) {
        return { todos: [action.editedTodo], calendarDate: state.calendarDate };
      } else {
        const todo = state.todos.find(
          (todo) => todo.id === action.editedTodo.id
        );
        if (todo.date !== action.editedTodo.date) {
          const newTodos = state.todos.filter(
            (todo) => todo.id !== action.editedTodo.id
          );
          newTodos.splice(
            DateBinarySearch(
              newTodos,
              dayjs(action.editedTodo.date, "M-D-YYYY")
            ),
            0,
            action.editedTodo
          );
          console.log(newTodos);
          return {
            todos: newTodos,
            calendarDate: state.calendarDate,
          };
        } else {
          const newTodos = state.todos.map((todo) => {
            if (todo.id === action.editedTodo.id) {
              return action.editedTodo;
            }
            return todo;
          });
          return {
            todos: newTodos,
            calendarDate: state.calendarDate,
          };
        }
      }
    /*else if (action.date) {
        const newTodos = state.todos.filter(
          (todo) => todo.id !== action.editedTodo.id
        );
        newTodos.splice(
          DateBinarySearch(newTodos, dayjs(action.editedTodo.date, "M-D-YYYY")),
          0,
          action.editedTodo
        );
        console.log(newTodos);
        return {
          todos: newTodos,
          calendarDate: state.calendarDate,
        };
      } else {
        const newTodos = state.todos.map((todo) => {
          if (todo.id === action.editedTodo.id) {
            return action.editedTodo;
          }
          return todo;
        });
        return {
          todos: newTodos,
          calendarDate: state.calendarDate,
        };
      }*/
    case "SET_TODOS":
      return {
        todos: [...action.todos],
        calendarDate: state.calendarDate,
      };
    case "CLEAR_TODOS":
      return {
        todos: [],
        calendarDate: state.calendarDate,
      };
    case "EDIT_CALENDAR_DATE":
      return {
        todos: [...state.todos],
        calendarDate: action.calendarDate,
      };
    default:
      throw new Error();
  }
};
