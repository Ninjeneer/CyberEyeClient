import Page from "../../components/Page/Page"
import { useAuth } from "../../contexts/Auth"

const DashboardPage = () => {
    const session = useAuth()

    return (
        <Page pageTitle="Tableau de bord">
            <p>{session.user.email}</p>
        </Page>
    )
}

export default DashboardPage