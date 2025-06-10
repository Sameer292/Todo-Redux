import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'

export interface Itodo {
  id: string
  todo: string
  completed: boolean
}

interface TodoState {
  todoList: Itodo[]
}

const initialState: TodoState = {
  todoList: [],
}

const todoSlice = createSlice({
  name: 'todo',
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
            completed: false
          }
        }
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todoList = state.todoList.filter(todo => todo.id !== action.payload)
    },
    editTodo: {
      reducer:(state, action: PayloadAction<Itodo>) => {
          const index = state.todoList.findIndex(todo => todo.id === action.payload.id)
          if (index !== -1) {
            state.todoList[index] = action.payload
          }
      },
      prepare: (text:string):{payload: Itodo} => {
        return {
          payload: {
            id: nanoid(),
            todo: text,
            completed: false
          }
        }
      }
},
toggleCompleted: (state, action: PayloadAction<string>) => {
  const todo = state.todoList.find(todo => todo.id === action.payload)
  if (todo) {
    todo.completed = !todo.completed
  }
},
  },
})

export const { addTodo, removeTodo, editTodo, toggleCompleted } = todoSlice.actions
export default todoSlice.reducer
