import { useMemo, useState } from "react"
import { TbSquareChevronDown, TbSquareChevronUp } from "react-icons/tb";

type Props = {
    name: string
    children: React.ReactNode
}

const iconSize = 25

const Section = ({ name, children }: Props) => {
    const [show, setShow] = useState(true)

    return (
        <div>
            <header className="border-b-2 border-b-black flex justify-between items-center p-2 mt-2">
                {name}
                <span onClick={() => setShow(!show)} className="hover:cursor-pointer">
                    {show ? <TbSquareChevronUp size={iconSize}/> : <TbSquareChevronDown size={iconSize} />}
                </span>
            </header>
            {show ? (
                <div className="container p-2 mt-2">
                    {children}
                </div>
            ) : null}
        </div>
    )
}

export default Section