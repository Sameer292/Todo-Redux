import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { type AppDispatch } from './store'
import { doneTodoActions } from './exportActions'


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
    // const dispatch = useDispatch<AppDispatch>()

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
                console.log("CLeared");

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
            // toggleCompleted: (state, action: PayloadAction<string>) => {
            //     const todo = state.todoList.find(todo => todo.id === action.payload)
            //     if (todo) {
            //         state.todoList.splice(state.todoList.indexOf(todo), 1)
            //         todo.completed = !todo.completed
            //         dispatch(doneTodoActions.addTodo(todo.todo))
            //     }
            // },
            toggleCompleted: (state, action: PayloadAction<string>) => {
                const todo = state.todoList.find(todo => todo.id === action.payload)
                if (todo) {
                    todo.completed = !todo.completed
                }
            },
        },
    })


}




export const onGoingTodoSlice = createOnGoingTodoSlice()


export const onGoingTodoReducer = onGoingTodoSlice.reducer
