import TodoItem from "./TodoItem"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
const TodoList = () => {
  const todoList = useSelector((state: RootState) => state.todo.todoList)
  return (
    <div className='todo-list-container flex mb-5 flex-wrap text-center shadow-lg flex-col min-h-10 overflow-hidden justify-center border-2 rounded-md border-gray-400 '>
      {
        todoList.length === 0 ? <div>Empty List</div> :
          todoList.map((todo,_) => (
            <TodoItem key={todo.id} todo={todo.todo} completed={todo.completed} id={todo.id} />
          ))
      }
    </div>
  )
}

export default TodoList
