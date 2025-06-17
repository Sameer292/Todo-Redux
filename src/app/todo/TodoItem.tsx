import React, { useState, useRef } from "react";
import { type Itodo } from "../../redux/store";
import { type AppDispatch, Section as EnumSection } from "../../redux/store";
import { useDispatch } from "react-redux";

interface Props extends Itodo {
  actions: {
    removeTodo: (id: string) => any,
    editTodo: (id: string, todo: string) => any
  },
  changeAction?: {
    addTodo: (todo: string) => any
  },
  Section: EnumSection
}

const TodoItem = React.memo(({ todo, id, actions, changeAction, Section }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const [IsTodoEditing, setIsTodoEditing] = useState<boolean>(false);
  const [todoMsg, setTodoMsg] = useState<string>(todo);
  const inputRef = useRef<HTMLInputElement>(null)

  const updateTodo = () => {
    dispatch(actions.editTodo(id, todoMsg))
    setIsTodoEditing((prev)=>!prev);
  }
  const deleteTodo = () => {
    dispatch(actions.removeTodo(id))

  }
  const handleChangeAction = () => {
    dispatch(actions.removeTodo(id))
    dispatch(changeAction?.addTodo(todoMsg))
  }

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateTodo()
    }
  }

  return (
    <div className="flex border-b-2 border-b-gray-300  px-3 py-1.5 gap-x-3">
      {Section === EnumSection.YetToStart ? <button onClick={handleChangeAction} className="bg-blue-700 text-white rounded-md px-1" >Start</button> : Section === EnumSection.OnGoing && <button onClick={handleChangeAction} className="bg-green-700 text-white rounded-md px-1" >Done</button> 
      }
      <input
        type="text"
        className={`border-2 text-black outline-none w-full rounded-lg truncate ${IsTodoEditing ? "border-gray-400 px-2" : "border-transparent"
          } `}
        value={todoMsg}
        ref={inputRef}
        onKeyDown={handleInput}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!IsTodoEditing}
      />
      <button
        className="w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (IsTodoEditing){
            updateTodo();
          } else {
            setIsTodoEditing(true);
            inputRef.current?.focus();
          }
        }}
      >
        {IsTodoEditing ? "📁" : "✏️"}
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

export default TodoItem;