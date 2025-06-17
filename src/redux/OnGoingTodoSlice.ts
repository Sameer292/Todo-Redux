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

const createOnGoingTodoSlice = () => {

    return createSlice({
        name: 'onGoingTodo',
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
            removeAllTodo: (state) => {
                state.todoList = []
            },
            editTodo: {
                reducer: (state, action: PayloadAction<Itodo>) => {
                    const index = state.todoList.findIndex(todo => todo.id === action.payload.id)
                    if (index !== -1) {
                        state.todoList[index] = action.payload
                    }
                },
                prepare: (id: string, text: string): { payload: Itodo } => {
                    return {
                        payload: {
                            id: id,
                            todo: text,
                            completed: false
                        }
                    }
                }
            },
        },
    })


}




export const onGoingTodoSlice = createOnGoingTodoSlice()


export const onGoingTodoReducer = onGoingTodoSlice.reducer
