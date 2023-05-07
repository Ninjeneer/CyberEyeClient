import cx from 'classnames'
import { useMemo, useState } from 'react'
import Card from '../Card/Card'

type TabHeaderProps = {
    title: string
    selected?: boolean
    onSelect?: () => void
}
const TabHeader = ({ title, selected, onSelect }: TabHeaderProps) => {
    return (
        <div className={cx(
            "px-8 py-4 text-lg border-t-4",
            selected ? "text-primary border-t-primary font-bold" : "text-black border-t-gray-300",
            "hover:cursor-pointer")} onClick={onSelect}>
            {title}
        </div>
    )
}


type Props = {
    tabs: {
        title: string
        component: React.ReactNode
        disabled?: boolean
        selected?: boolean
    }[]
    className?: string
}
const TabCard = ({ tabs, className }: Props) => {

    const [selectedTab, setSelectedTab] = useState(tabs?.[0]?.title)
    const tabComponent = useMemo(() => tabs.find((tab) => tab.title === selectedTab)?.component, [selectedTab])

    return (
        <section className='relative'>
            <nav className='flex justify-start bg-white z-10 absolute h-16'>
                {tabs.map((tab, index) => (
                    <TabHeader title={tab.title} key={`tab_${tab.title}_${index}`} onSelect={() => setSelectedTab(tab.title)} selected={tab.title === selectedTab} />
                ))}
            </nav>

            <Card className={cx('absolute top-16', className)}>
                {tabComponent}
            </Card>
        </section>
    )
}

export default TabCard