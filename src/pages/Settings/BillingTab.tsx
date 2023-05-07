import { useState } from "react"
import PlanSelector from "../../components/PlanSelector/PlanSelector"
import { useAuth } from "../../contexts/Auth"
import Button from "../../components/Button/Button"

const BillingTab = () => {
    const session = useAuth()
    const [plan, setPlan] = useState(session.user.settings?.plan)

    return (
        <div className="p-4 flex flex-col">
            <h1 className="text-2xl">Modifier votre plan</h1>
            <div className="flex justify-center">
                <PlanSelector onSelectPlan={setPlan} selectedPlan={plan} />
            </div>

            <div className="flex justify-end mt-4 w-full">
                <Button type="primary" disabled={session.user.settings.plan === plan}>Enregistrer</Button>
            </div>
        </div>
    )
}

export default BillingTab