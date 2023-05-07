import { FaArrowRight, FaCheckCircle } from "react-icons/fa"
import Button from "../../components/Button/Button"
import { useNavigate } from "react-router-dom"
import { useCallback } from "react"

const CheckoutSuccessPage = () => {
    const navigate = useNavigate()

    const goToStart = useCallback(() => {
        navigate('/')
    }, [])

    return (
        <div className="w-full h-full flex justify-center items-center bg-bgLight overflow-y-auto">
            <section className="w-full md:w-[700px] flex flex-col items-center text-center m-auto p-5 md:p-10 bg-white shadow gap-5 md:gap-10">
                <FaCheckCircle size={50} className="text-success" />
                <h1 className="text-3xl">Votre paiement a été traité avec succès</h1>
                <Button type="primary" onClick={goToStart}>Démarrer <FaArrowRight className="ml-2 mb-1"/></Button>
            </section>
        </div>
    )
}

export default CheckoutSuccessPage