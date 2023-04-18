import { useMemo, useState } from 'react'
import { availablePeriodicities } from '../../utils/cronUtils'
import Button from '../Button/Button'

type Props = {
    onChange: (value: string) => void
    value?: string
}

const Periodicity = ({ onChange, value }: Props) => {

    return (
        <div className='flex flex-col gap-2 lg:flex-row'>
            {availablePeriodicities.map((periodicity) => (
                <Button
                    type={value === periodicity.cron ? 'primary' : 'secondary'}
                    onClick={() => {
                        onChange(periodicity.cron)
                    }}
                    key={periodicity.cron}
                >
                    {periodicity.label}
                </Button>
            ))}
        </div>
    )
}

export default Periodicity