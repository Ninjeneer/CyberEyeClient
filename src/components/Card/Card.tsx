import React from 'react'
import cx from "classnames"

type Props = {
    children: React.ReactNode,
    className?: string
}
const Card = ({ children, className }: Props) => {
    return (
        <div className={cx("bg-white shadow w-full", className)}>
            {children}
        </div>
    )
}

export default Card