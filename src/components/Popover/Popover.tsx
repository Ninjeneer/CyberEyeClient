import React, { useState } from 'react'
import { useEffect } from "react"
import useOutsideClick from '../../hooks/clickOutside'

const Trigger = ({ children, className = '' }) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

type ItemProps = {
    children: React.ReactNode
    onClick?: () => void
}
const Item = ({ children, onClick }: ItemProps) => {
    return (
        <li className='p-4 hover:backdrop-brightness-90 hover:cursor-pointer duration-150 text-white' onClick={onClick}>
            {children}
        </li>
    )
}

type Props = {
    children: React.ReactNode[]
}
const PopoverContainer = ({ children }: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useOutsideClick(() => setIsOpen(false))

    return (
        <div className='relative' ref={ref}>
            <div onClick={() => setIsOpen(!isOpen)} className='hover:cursor-pointer'>
                {children[0]}
            </div>

            {isOpen ? (
                <div className='absolute bottom-0 translate-y-full right-0 flex flex-col items-end'>
                    <div className='h-0 w-0 border-x-8 border-x-transparent border-b-[16px] border-b-primary mr-1'></div>
                    <ul className='bg-primary shadow'>
                        {children.slice(1)}
                    </ul>
                </div>
            ) : null}
        </div>
    )
}

export default {
    PopoverContainer,
    Trigger,
    Item
}