import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { User } from "lucide-react"
import { type user } from "@/redux/store"
import { useRouter } from "next/navigation"

export function ProfileDialog({ user }: { user: user | null }) {
    const router = useRouter()
    const handleClick = () => {
        localStorage.removeItem("currentUser");
        router.push('/signIn')
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex items-center gap-2 flex-col ">
                    <Button variant="outline" className="rounded-full"><User /></Button>
                    <span className="text-[#f6f4f0]">
                        {user?.name}
                    </span>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{user?.name}</DialogTitle>
                    <DialogDescription>
                        Welcome to your profile
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        Email: {user?.email}
                    </div>
                    <div className="grid gap-3">
                        Date of birth: {user?.dob}
                    </div>
                    <div className="grid gap-3">
                        Gender: {user?.gender}
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="destructive" onClick={handleClick}>Logut</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
