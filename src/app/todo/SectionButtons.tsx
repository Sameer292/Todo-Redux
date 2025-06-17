import { memo } from "react"
import { type Section } from "@/redux/store"
type Props = {
    handleButtons: (mySection: Section) => void
    section: Section | null
    text: string
    mySection: Section
}

const SectionButtons = ({ handleButtons, section, text, mySection }: Props) => {
    return (
        <button onClick={() => handleButtons(mySection)} className={`${section === mySection ? "bg-[#32332f]" : "bg-[#7c7e73]"}  text-wrap wrap-anywhere sm:p-2 py-2 px-1 text-sm transition duration-150 ease-linear active:scale-95 rounded-md text-white`}>
            {text}
        </button>
    )
}
export default memo(SectionButtons)