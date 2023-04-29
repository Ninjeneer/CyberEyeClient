import { useCallback, useState } from "react"
import PlanSelector from "../../components/PlanSelector/PlanSelector"
import api from "../../api/api"
import { useAuth } from "../../contexts/Auth"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button/Button"
import { FaArrowRight } from "react-icons/fa"

const SelectPlanPage = () => {
    const session = useAuth()
    const navigate = useNavigate()

    const [plan, setPlan] = useState(null)

    const selectPlan = useCallback(() => {
        if (plan === 'free') {
            console.log({ session })
            api.authenticated(session).settings.update({ plan }).then((res) => {
                if (res.error) {
                    toast('Une erreur est survenue', { type: 'error' })
                    return
                }
                navigate('/')
            })
        }
    }, [])

    return (
        <div className="w-full h-full flex justify-center items-center bg-bgLight overflow-y-auto">
            <section className="w-full md:w-min flex flex-col m-auto p-5 md:p-10 bg-white shadow gap-5 md:gap-10">
                <h1 className="text-3xl">Sélectionnez votre plan</h1>
                <div className="p-8">
                    <PlanSelector onSelectPlan={setPlan} selectedPlan={plan} />
                </div>

                <div className="flex justify-center md:justify-end">
                    <Button type="primary" disabled={!plan} onClick={selectPlan}>Suivant <FaArrowRight className="ml-2" /></Button>
                </div>
            </section>
        </div>
    )
}

export default SelectPlanPage