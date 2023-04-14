import React from 'react'
import PuffLoader from 'react-spinners/PuffLoader'

const sizes: Record<Props['size'], number> = {
    big: 100,
    small: 25
}

type Props = {
    inverted: boolean
    size: 'big' | 'small'
}
const Spinner = ({ inverted = false, size = 'big' }: Props) => {
    return (
        <span className='w-full h-full flex justify-center items-center'>
            <PuffLoader
                color={ inverted ? '#FFFFFF' : '#0094FF'}
                size={sizes[size]}
            />
        </span>
    )
}

export default Spinner