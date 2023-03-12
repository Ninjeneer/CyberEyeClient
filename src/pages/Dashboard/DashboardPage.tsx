import Page from "../../components/Page/Page"
import { useAuth } from "../../contexts/Auth"

const DashboardPage = () => {
    const user = useAuth()

    return (
        <Page pageTitle="Tableau de bord">
            <p>{user.email}</p>
        </Page>
    )
}

export default DashboardPage