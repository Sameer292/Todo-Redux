import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { createSelector } from "@reduxjs/toolkit"

const selectTodoCounts = createSelector(
    [(state: RootState) => state.doneTodo.todoList.length,
    (state: RootState) => state.onGoingTodo.todoList.length,
    (state: RootState) => state.yetToStartTodo.todoList.length],
    (doneCount, onGoingCount, yetToStartCount) => {
        return {
            done: doneCount,
            onGoing: onGoingCount,
            yetToStart: yetToStartCount
        }
    }
)

const TodoCount = () => {
    const { done, onGoing, yetToStart } = useSelector(selectTodoCounts)
    return (
        <div className="border-2 border-black  rounded-md shadow-lg bg-[#b2b5a5] flex flex-col px-3 items-end w-fit  ">
            <h2 className="text-center font-bold text-red-700" >Yet To Start: {yetToStart}</h2>
            <h2 className="text-center font-bold text-blue-700" >On Going: {onGoing}</h2>
            <h2 className="text-center font-bold text-green-700" >Completed: {done}</h2>
        </div>
    )
}

export default TodoCount