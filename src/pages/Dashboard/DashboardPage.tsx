import { useEffect, useState } from "react"
import Card from "../../components/Card/Card"
import EmptyPage from "../../components/Page/EmptyPage"
import { useAuth } from "../../contexts/Auth"
import { UserStats } from "../../models/stats"
import cx from 'classnames'
import api from "../../api/api"
import { StatusCodes } from "http-status-codes"
import Spinner from "../../components/Spinner/Spinner"
import { isDefined } from "../../utils/utils"


const fakeData: UserStats = {
    nbScans: 4,
    nbReports: 11,
    nbTotalProbes: 22,
    avgProbesPerScan: 2,
    nbVuln: 6
}

type StatCardProps = {
    title: string
    value: any
    className?: string
}
const StatCard = ({ title, value, className }: StatCardProps) => {
    return (
        <Card className={cx("p-4 flex flex-col gap-4", className)}>
            <h2 className="font-bold ">{title}</h2>
            <span className="text-7xl text-primary text-center">{value}</span>
        </Card>
    )
}

const DashboardPage = () => {
    const { session } = useAuth()
    const [stats, setStats] = useState<UserStats>(null)

    useEffect(() => {
        api.authenticated(session).stats.getMyStats()
            .then(async (res) => {
                if (res.status == StatusCodes.OK) {
                    setStats(await res.json())
                }
            })
    }, [])

    return (
        <EmptyPage pageTitle="Tableau de bord">
            <div className="w-full md:w-4/5 m-auto grid grid-cols-3 gap-2">

                <Card className="p-4 flex justify-center items-center text-center col-span-3">
                    <p>Bienvenue sur <b>Cyber Eye</b>, votre assistant de sécurité pour vos applications et infrastructures.</p>
                </Card>

                <StatCard title="Nombre total de scans" value={isDefined(stats?.nbScans) ? stats.nbScans : <Spinner size="medium" />} />
                <StatCard title="Nombre total de rapports" value={isDefined(stats?.nbReports) ? stats.nbReports : <Spinner size="medium" />} />
                <StatCard title="Nombre total de sondes" value={isDefined(stats?.nbTotalProbes) ? stats.nbTotalProbes : <Spinner size="medium" />} />
                {/* <StatCard title="Nombre moyen de sonde par scan" value={isDefined(stats?.avgProbesPerScan) ? stats.avgProbesPerScan : <Spinner size="medium" />} /> */}
                {/* <StatCard title="Nombre de vulnérabilité trouvées" value={isDefined(stats?.nbVuln) ? stats.nbVuln : <Spinner size="medium" />} /> */}

            </div>
        </EmptyPage>
    )
}

export default DashboardPage