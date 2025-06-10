"use client"
import TodoInput from "./todo/TodoInput";
import TodoList from "./todo/TodoList";
import { Provider } from "react-redux";
import { store } from "../redux/store.ts";
export default function Home() {
  return (
    <Provider store={store}>
      < div className="flex flex-col items-center  min-h-screen bg-[#f6f4f0]" >
        <div className="w-full h-40 bg-[#7c7e73]" ></div>
        <div className=" lg:w-1/3 w-[calc(100%-3rem)] h-24 shadow-lg rounded-lg p-3 -mt-12 bg-[#f6f4f0] ">
          <TodoInput />
        </div>
        <div className="mt-8 lg:w-1/3  w-[calc(100%-3rem)]  ">
          <TodoList />
        </div>
      </div >
    </Provider>
  );
}
