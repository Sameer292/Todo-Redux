import { Skeleton } from "@/components/ui/skeleton"

export function ListSkeleton({ color }: { color: string }) {
    return (
        <div className='todo-list-container flex flex-wrap shadow-lg flex-col min-h-10 overflow-hidden justify-center border-2 md:w-96 rounded-md border-red-700'>
            <div className="flex justify-between px-3 pt-1">
                <Skeleton className={`w-20 ${color} `} />
                <Skeleton className="  w-10 flex h-7 items-center justify-center border-1 border-black rounded-md px-2 py-1  bg-red-700 text-xs font-bold text-white" />
            </div>
            <div className="h-11 sm:w-[22rem] flex justify-center items-center " >
                <Skeleton className="w-[80%]  h-5 sm:w-[15rem] bg-gray-400" />
            </div>
        </div>
    )
}
