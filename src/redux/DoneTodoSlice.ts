import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { type Itodo } from './store'
interface TodoState {
  todoList: Itodo[]
}

const initialState: TodoState = {
  todoList: [],
}

export const doneTodoSlice = createSlice({
  name: "doneTodo",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Itodo>) => {
        state.todoList.push(action.payload)
      },
      prepare: (text: string): { payload: Itodo } => {
        return {
          payload: {
            id: nanoid(),
            todo: text,
          }
        }
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todoList = state.todoList.filter(todo => todo.id !== action.payload)
    },
    removeAllTodo: (state) => {
      state.todoList = []      
    },
    editTodo: {
      reducer: (state, action: PayloadAction<Itodo>) => {
        const index = state.todoList.findIndex(todo => todo.id === action.payload.id)
        if (index !== -1) {
          state.todoList[index].todo = action.payload.todo
        }
      },
      prepare: (id: string, text: string): { payload: Itodo } => {
        return {
          payload: {
            id: id,
            todo: text,
          }
        }
      }
    },
  },
})

export const doneTodoReducer = doneTodoSlice.reducer