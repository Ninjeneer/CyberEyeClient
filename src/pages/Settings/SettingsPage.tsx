import EmptyPage from "../../components/Page/EmptyPage"
import TabCard from "../../components/TabCard/TabCard"
import BillingTab from "./BillingTab"

const SettingsPage = () => {
    return (
        <EmptyPage pageTitle="Paramètres">
            <div className="w-full md:w-4/5 m-auto">
                <TabCard
                    tabs={[
                        {
                            title: 'Général',
                            component: <p>Général</p>
                        },
                        {
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