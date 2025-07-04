import TodoItem from "./TodoItem"
import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState, Section, type Itodo, type user } from "../../redux/store"
import { doneTodoActions } from "@/redux/exportActions"
import { useEffect } from "react"

const DoneTodoList = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    const currentUser: user = JSON.parse(localStorage.getItem("currentUser") || "null")
    const todos = currentUser?.todos?.done || []
    dispatch(doneTodoActions.hydrateFromLocal(todos))
  }, [dispatch])
  const todoList: Itodo[] = useSelector((state: RootState) => state.doneTodo.todoList)

  return (
    <div className={`todo-list-container flex flex-wrap text-center shadow-lg flex-col min-h-10 overflow-hidden sm:w-96 justify-center  border-2 rounded-md border-green-700 `}>
      <div className="flex justify-between px-3 pt-1">
        <h2 className="text-center font-bold text-green-700" >Completed</h2>
        <button className=" w-10 flex items-center justify-center  border-1 border-black rounded-md px-2 py-1  bg-red-700 text-xs font-bold text-white" onClick={() => dispatch(doneTodoActions.removeAllTodo())} >
          Clear
        </button>
      </div>
      {
        todoList.length === 0 ? <div className=" h-11 sm:w-[22rem]  text-center content-center ">Empty List</div> :
          todoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo.todo} actions={doneTodoActions} Section={Section.Done} id={todo.id} />
          ))
      }
    </div>
  )
}

export default DoneTodoList