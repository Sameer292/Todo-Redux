import TodoItem from "./TodoItem"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { yetToStartTodoActions } from "@/redux/exportActions"
import { onGoingTodoActions } from "@/redux/exportActions"
import { useDispatch } from "react-redux"
import { AppDispatch, Section } from "../../redux/store"
const YetToStartTodoList = () => {
    const dispatch = useDispatch<AppDispatch>()
    const todoList = useSelector((state: RootState) => state.yetToStartTodo.todoList)
    return (
        <div className='todo-list-container flex flex-wrap shadow-lg flex-col min-h-10 overflow-hidden justify-center border-2 md:w-96 rounded-md border-red-700'>
            <div className="flex justify-between px-3 pt-1">
                <h2 className="text-center font-bold text-red-700">Yet To Start</h2>
                <button className="  w-10 flex items-center justify-center border-1 border-black rounded-md px-2 py-1  bg-red-700 text-xs font-bold text-white" onClick={() => dispatch(yetToStartTodoActions.removeAllTodo())} >
                    Clear
                </button>
            </div>

            {
                todoList.length === 0 ? <div className="h-11 text-center sm:w-[22rem] content-center " >Empty List</div> :
                    todoList.map((todo, _) => (
                        <TodoItem key={todo.id} actions={yetToStartTodoActions} Section={Section.YetToStart} todo={todo.todo} changeAction={onGoingTodoActions} completed={todo.completed} id={todo.id} />
                    ))
            }
        </div>
    )
}

export default YetToStartTodoList
