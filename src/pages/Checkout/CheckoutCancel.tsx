import { FaArrowLeft, FaTimesCircle } from "react-icons/fa"
import Button from "../../components/Button/Button"
import { useCallback, useMemo } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const CheckoutCancelPage = () => {
    const navigate = useNavigate()
    const [params, setParams] = useSearchParams()


    const goToPlans = useCallback(() => {
        navigate('/select-plan')
    }, [])

    const goToSettings = useCallback(() => {
        navigate('/settings#billing')
    }, [])

    const isFromSettings = useMemo(() => {
        return !!params.get('fromSettings')
    }, [params])

    return (
        <div className="w-full h-full flex justify-center items-center bg-bgLight overflow-y-auto">
            <section className="w-full md:w-[700px] flex flex-col items-center text-center m-auto p-5 md:p-10 bg-white shadow gap-5 md:gap-10">
                <FaTimesCircle size={50} className="text-danger" />
                <h1 className="text-3xl">Votre paiement a été annulé</h1>
                <Button type="primary" onClick={isFromSettings ? goToSettings : goToPlans}><FaArrowLeft className="mr-2 mb-1" /> Retour aux plans</Button>
            </section>
        </div>
    )
}

export default CheckoutCancelPage