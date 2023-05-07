import Card from "../../components/Card/Card"
import EmptyPage from "../../components/Page/EmptyPage"
import Page from "../../components/Page/Page"
import TabCard from "../../components/TabCard/TabCard"
import { useAuth } from "../../contexts/Auth"

const DashboardPage = () => {
    const session = useAuth()

    return (
        <EmptyPage pageTitle="Tableau de bord">
            <div className="w-full md:w-4/5 m-auto">
                <Card>
                    <p>{session.user.email}</p>
                </Card>
            </div>
        </EmptyPage>
    )
}

export default DashboardPage