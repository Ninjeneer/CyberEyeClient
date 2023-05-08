import cx from 'classnames'
import { useEffect, useMemo, useState } from 'react'
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
        id: string
        title: string
        component: React.ReactNode
        disabled?: boolean
        selected?: boolean
    }[]
    className?: string
    currentTab?: string // tab id
}
const TabCard = ({ tabs, className, currentTab }: Props) => {

    const [selectedTab, setSelectedTab] = useState(currentTab || tabs?.[0]?.id)
    const tabComponent = useMemo(() => tabs.find((tab) => tab.id === selectedTab)?.component, [selectedTab, currentTab])

    useEffect(() => {
        if (currentTab !== selectedTab) {
            setSelectedTab(currentTab)
        }
    }, [currentTab])

    useEffect(() => {
        if (window.location.hash !== selectedTab) {
            window.location.hash = selectedTab
        }
    }, [selectedTab])

    return (
        <section className='relative'>
            <nav className='flex justify-start bg-white z-10 absolute h-16'>
                {tabs.map((tab, index) => (
                    <TabHeader title={tab.title} key={`tab_${tab.title}_${index}`} onSelect={() => setSelectedTab(tab.id)} selected={tab.id === selectedTab} />
                ))}
            </nav>

            <Card className={cx('absolute top-16', className)}>
                {tabComponent}
            </Card>
        </section>
    )
}

export default TabCard