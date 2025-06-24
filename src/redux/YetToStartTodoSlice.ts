"use client"
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { type Itodo } from './store'
import { type user } from './store'

interface TodoState {
    todoList: Itodo[]
}

const initialState: TodoState = {
    todoList: [],
}


export const yetToStartTodoSlice = createSlice({
    name: 'yetToStartTodo',
    initialState,
    reducers: {
        addTodo: {
            reducer: (state, action: PayloadAction<Itodo>) => {
                state.todoList.push(action.payload)

                const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null")
                const allUsers = JSON.parse(localStorage.getItem("users") || "[]")

                if (currentUser && Array.isArray(allUsers)) {
                    const updatedUsers = allUsers.map((user: user) => {
                        if (user.id === currentUser.id) {
                            return {
                                ...user,
                                todos: {
                                    ...user.todos,
                                    yetToStart: [...state.todoList],
                                },
                            }
                        }
                        return user
                    })
                    localStorage.setItem("users", JSON.stringify(updatedUsers))
                    const updatedCurrent = updatedUsers.find((u: any) => u.id === currentUser.id)
                    localStorage.setItem("currentUser", JSON.stringify(updatedCurrent))
                }
            },
            prepare: (text: string): { payload: Itodo } => ({
                payload: {
                    id: nanoid(),
                    todo: text,
                }
            })
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            state.todoList = state.todoList.filter(todo => todo.id !== action.payload)

            const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null")
            const allUsers = JSON.parse(localStorage.getItem("users") || "[]")

            if (currentUser && Array.isArray(allUsers)) {
                const updatedUsers = allUsers.map((user: user) => {
                    if (user.id === currentUser.id) {
                        return {
                            ...user,
                            todos: {
                                ...user.todos,
                                yetToStart: [...state.todoList]
                            }
                        }
                    }
                    return user
                })
                localStorage.setItem("users", JSON.stringify(updatedUsers))
                const updatedCurrent = updatedUsers.find((u: user) => u.id === currentUser.id)
                localStorage.setItem("currentUser", JSON.stringify(updatedCurrent))
            }
        },
        removeAllTodo: (state) => {
            state.todoList = []
            const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null")
            const allUsers = JSON.parse(localStorage.getItem("users") || "[]")

            if (currentUser && Array.isArray(allUsers)) {
                const updatedUsers = allUsers.map((user: user) => {
                    if (user.id === currentUser.id) {
                        return {
                            ...user,
                            todos: {
                                ...user.todos,
                                yetToStart: []
                            }
                        }
                    }
                    return user
                })
                localStorage.setItem("users", JSON.stringify(updatedUsers))
                const updatedCurrent = updatedUsers.find((u: user) => u.id === currentUser.id)
                localStorage.setItem("currentUser", JSON.stringify(updatedCurrent))
            }
        },
        editTodo: {
            reducer: (state, action: PayloadAction<Itodo>) => {
                const index = state.todoList.findIndex(todo => todo.id === action.payload.id)
                if (index !== -1) {
                    state.todoList[index].todo = action.payload.todo
                    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null")
                    const allUsers = JSON.parse(localStorage.getItem("users") || "[]")

                    if (currentUser && Array.isArray(allUsers)) {
                        const updatedUsers = allUsers.map((user: user) => {
                            if (user.id === currentUser.id) {
                                return {
                                    ...user,
                                    todos: {
                                        ...user.todos,
                                        yetToStart: [...state.todoList]
                                    }
                                }
                            }
                            return user
                        })
                        localStorage.setItem("users", JSON.stringify(updatedUsers))
                        const updatedCurrent = updatedUsers.find((u: user) => u.id === currentUser.id)
                        localStorage.setItem("currentUser", JSON.stringify(updatedCurrent))
                    }
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
        hydrateFromLocal: (state, action: PayloadAction<Itodo[]>) => {
            state.todoList = action.payload
        }

    },
})

export const yetToStartTodoReducer = yetToStartTodoSlice.reducer