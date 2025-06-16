import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const TodoCount = () => {
    const DoneTodoList = useSelector((state: RootState) => state.doneTodo.todoList)
    const OnGoingTodoList = useSelector((state: RootState) => state.onGoingTodo.todoList)
    const YetToStartTodoList = useSelector((state: RootState) => state.yetToStartTodo.todoList)
    return (
        <div className="border-2 border-black  rounded-md shadow-lg bg-[#b2b5a5] flex flex-col px-3 items-end w-fit  ">
            <h2 className="text-center font-bold text-red-700" >Yet To Start: {YetToStartTodoList.length}</h2>
            <h2 className="text-center font-bold text-blue-700" >On Going: {OnGoingTodoList.length}</h2>
            <h2 className="text-center font-bold text-green-700" >Completed: {DoneTodoList.length}</h2>
        </div>
    )
}

export default TodoCount
