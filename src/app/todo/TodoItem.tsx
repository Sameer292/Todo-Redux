import React, { useState, useRef } from "react";
import { type Itodo } from "../../redux/slice";
import { editTodo, removeTodo, toggleCompleted } from "../../redux/slice";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../redux/store";

const TodoItem = React.memo(({ todo, id, completed }: Itodo) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo);
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const updateTodo = () => {
    dispatch(editTodo(id, todoMsg))
    setIsTodoEditable(false);
  }
  const deleteTodo = () => {
    dispatch(removeTodo(id))

  }
  const toggleCheck = () => {
    dispatch(toggleCompleted(id))
  }

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateTodo()
    }
  }

  return (
    <div className={"flex border-b-2 border-b-gray-300  px-3 py-1.5 gap-x-3 }"}>
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={completed}
        onChange={toggleCheck}
      />
      <input
        type="text"
        className={`border-2 text-black outline-none w-full rounded-lg truncate ${isTodoEditable ? "border-gray-400 px-2" : "border-transparent"
          } ${completed ? "line-through " : ""}`}
        value={todoMsg}
        ref={inputRef}
        onKeyDown={handleInput}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button
        className="w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (completed) return;
          if (isTodoEditable) {
            updateTodo();
          } else {
            setIsTodoEditable((prev) => !prev);
            inputRef.current?.focus();

          }
        }}
        disabled={completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo()}
      >
        🗑
      </button>
    </div>
  );
});
TodoItem.displayName = "TodoItem"

export default TodoItem;
