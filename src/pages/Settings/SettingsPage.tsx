import { useLocation } from "react-router-dom"
import EmptyPage from "../../components/Page/EmptyPage"
import TabCard from "../../components/TabCard/TabCard"
import BillingTab from "./BillingTab"
import { useMemo } from "react"

const SettingsPage = () => {
    const location = useLocation()

    const currentTab = useMemo(() => {
        if (location?.hash) {
            return location.hash.substring(1)
        }
    }, [location])

    return (
        <EmptyPage pageTitle="Paramètres">
            <div className="w-full md:w-4/5 m-auto">
                <TabCard
                    currentTab={currentTab}
                    tabs={[
                        {
                            id: 'general',
                            title: 'Général',
                            component: <p>Général</p>
                        },
                        {
                            id: 'billing',
                            title: 'Facturation',
                            component: <BillingTab />
                        }
                    ]}
                />
            </div>
        </EmptyPage>
    )
}

export default SettingsPage