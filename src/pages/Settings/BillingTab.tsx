import { useCallback, useEffect, useState } from "react"
import PlanSelector from "../../components/PlanSelector/PlanSelector"
import { useAuth } from "../../contexts/Auth"
import Button from "../../components/Button/Button"
import { StatusCodes } from "http-status-codes"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../../api/api"
import { planMappingMonthPrices } from "../../config/billing"
import { FaArrowRight } from "react-icons/fa"
import { MdShoppingCartCheckout } from "react-icons/md"
import Spinner from "../../components/Spinner/Spinner"

const BillingTab = () => {
    const session = useAuth()
    const [plan, setPlan] = useState(session.user.settings?.plan)

    const [loading, setLoading] = useState(false)

    const selectPlan = useCallback(() => {
        if (plan === 'free') {
            api.authenticated(session).settings.update({ plan }).then((res) => {
                if (res.error) {
                    toast('Une erreur est survenue', { type: 'error' })
                    return
                }
            })
        } else {
            const priceId = planMappingMonthPrices.month[plan]
            if (!priceId) {
                console.error(`No price ID for plan ${plan}`)
                return
            }
            setLoading(true)
            api.authenticated(session).billing.buyPlan(priceId, true)
                .then(async (res) => {
                    if (res.status === StatusCodes.CREATED) {
                        const { redirection } = await res.json()
                        window.location.href = redirection
                        return
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [plan])

    return (
        <div className="p-4 flex flex-col">
            <h1 className="text-2xl">Modifier votre plan</h1>
            <div className="flex justify-center">
                <PlanSelector onSelectPlan={setPlan} selectedPlan={plan} />
            </div>

            <div className="flex justify-end mt-4 w-full">
                <Button type="primary" disabled={session.user.settings.plan === plan} onClick={selectPlan}>
                    {
                        loading ? <Spinner inverted size="small" /> : (
                            <>
                                Suivant
                                {plan === 'free' ? <FaArrowRight className="ml-2" /> : <MdShoppingCartCheckout size={25} className="ml-2" />}
                            </>
                        )
                    }
                </Button>
            </div>
        </div>
    )
}

export default BillingTab