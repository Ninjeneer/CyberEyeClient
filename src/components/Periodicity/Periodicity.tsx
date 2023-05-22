import { useMemo, useState } from 'react'
import { availablePeriodicities } from '../../utils/cronUtils'
import Button from '../Button/Button'

type Props = {
    onChange: (value: string) => void
    value?: string
    massDisable: Record<string, { active: boolean, reason?: string }> // Decide which periodicity needs to be disabled
    disabled?: boolean
}

const Periodicity = ({ onChange, value, massDisable, disabled }: Props) => {

    return (
        <div className='flex flex-col gap-2 lg:flex-row'>
            {availablePeriodicities.map((periodicity) => (
                <Button
                    type={value === periodicity.cron ? 'primary' : 'secondary'}
                    onClick={() => {
                        onChange(periodicity.cron)
                    }}
                    key={periodicity.cron}
                    disabled={!massDisable || (massDisable[periodicity.cron] && !massDisable[periodicity.cron].active)}
                    title={massDisable?.[periodicity.cron]?.reason}
                >
                    {periodicity.label}
                </Button>
            ))}
        </div>
    )
}

export default Periodicity