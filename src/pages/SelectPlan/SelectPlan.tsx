import { useCallback, useEffect, useState } from "react"
import PlanSelector from "../../components/PlanSelector/PlanSelector"
import api from "../../api/api"
import { useAuth } from "../../contexts/Auth"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button/Button"
import { FaArrowRight } from "react-icons/fa"
import { StatusCodes } from "http-status-codes"
import { planMappingMonthPrices } from "../../config/billing"
import { FiPackage } from 'react-icons/fi'
import { MdShoppingCartCheckout } from "react-icons/md"
import logo from '../../assets/logo.png'
import Spinner from "../../components/Spinner/Spinner"

const SelectPlanPage = () => {
	const { session, settings } = useAuth()
	const navigate = useNavigate()

	const [plan, setPlan] = useState(null)
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
			api.authenticated(session).billing.buyPlan(priceId)
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

	useEffect(() => {
		if (settings?.plan) {
			navigate('/')
		}
	}, [settings])

	return (
		<div className="w-full h-full flex justify-center items-center bg-bgLight overflow-y-auto">
			<section className="w-full md:w-min flex flex-col m-auto p-5 md:p-10 bg-white shadow gap-5 md:gap-10">
				<header className="flex flex-col-reverse gap-4 md:flex-row md:gap-0 justify-between items-center">
					<h1 className="text-3xl text-center flex gap-2"><FiPackage className="hidden md:inline-block" /> Sélectionnez votre plan</h1>
					<img src={logo} className="w-16" />
				</header>

				<div className="p-8">
					<PlanSelector onSelectPlan={setPlan} selectedPlan={plan} />
				</div>

				<div className="flex justify-center md:justify-end">
					<Button type="primary" disabled={!plan} onClick={selectPlan}>
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
			</section>
		</div>
	)
}

export default SelectPlanPage