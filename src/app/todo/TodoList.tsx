import TodoItem from "./TodoItem"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
const TodoList = () => {
  const todoList = useSelector((state: RootState) => state.todo.todoList)
  return (
    <div className='flex mb-5 flex-wrap text-center shadow-lg  flex-col min-h-10 justify-center border-2 rounded-md border-gray-400 '>
      {
        todoList.length === 0 ? <div>Empty List</div> :
          todoList.map((todo, index) => (
            <TodoItem key={todo.id} todo={todo.todo} completed={todo.completed} id={todo.id} isLast={index === todoList.length - 1} />
          ))
      }
    </div>
  )
}

export default TodoList
