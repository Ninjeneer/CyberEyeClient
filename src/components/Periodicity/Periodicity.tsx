import { useState } from 'react'
import { availablePeriodicities } from '../../utils/cronUtils'
import Button from '../Button/Button'

type Props = {
    onChange: (value: string) => void
}

const Periodicity = ({ onChange }: Props) => {
    const [selected, setSelected] = useState(null)

    return (
        <div className='flex flex-col gap-2 lg:flex-row'>
            {availablePeriodicities.map((periodicity) => (
                <Button
                    type={selected === periodicity.cron ? 'primary' : 'secondary'}
                    onClick={() => {
                        setSelected(periodicity.cron)
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