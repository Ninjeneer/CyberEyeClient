import { useCallback, useState } from "react"
import logo from '../../assets/logo.png'
import Button from "../../components/Button/Button"
import api from "../../api/api"
import { NavLink } from "react-router-dom"
import { handleEnterKey } from "../../utils/form.utils"

const RegisterPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const handleRegister = useCallback(() => {
		setError('')
		if (password !== confirmPassword) {
			setError('Les mots de passe ne correspondent pas')
			return
		}

		setLoading(true)
		api.auth.register(email, password)
			.then((res) => {
				if (res.error) {
					if (res.error.message === "User already registered") {
						setError('Cette adresse e-mail est déjà utilisée')
					} else {
						setError(res.error.message)
					}
				}
				console.log(res)
			})
			.finally(() => setLoading(false))
	}, [email, password, confirmPassword])

	return (
		<div className="w-full h-full flex justify-center items-center bg-bgLight overflow-y-auto">
			<section className="w-full md:w-1/3 flex flex-col m-auto p-10 bg-white shadow gap-10">
				<div className="flex flex-col items-center gap-2">
					<img src={logo} width={100} />
					<h1 className="text-3xl">Cyber Eye</h1>
				</div>

				<div className="flex flex-col gap-4">
					<div className="inputGroup">
						<label>Adresse e-mail</label>
						<input 
							type="email" 
							value={email} 
							onChange={(e) => setEmail(e.target.value)} 
							placeholder="Entrez votre adresse e-mail" 
							disabled={loading}
							onKeyDown={(e) => handleEnterKey(e, handleRegister)}
						/>
					</div>

					<div className="inputGroup">
						<label>Mot de passe</label>
						<input 
							type="password" 
							value={password} 
							onChange={(e) => setPassword(e.target.value)} 
							placeholder="Entrez votre mot de passe" 
							disabled={loading}
							onKeyDown={(e) => handleEnterKey(e, handleRegister)}
						/>
					</div>

					<div className="inputGroup">
						<label>Confirmer le mot de passe</label>
						<input 
							type="password" 
							value={confirmPassword} 
							onChange={(e) => setConfirmPassword(e.target.value)} 
							placeholder="Confirmez votre mot de passe" 
							disabled={loading}
							onKeyDown={(e) => handleEnterKey(e, handleRegister)} 
						/>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<Button type="primary" onClick={handleRegister} disabled={loading}>S'inscrire</Button>
					<NavLink to='/select-plan' className='link'>Déjà inscrit ? <b>Connectez vous</b></NavLink>
					{error ? <span className="text-danger">{error}</span> : null}
				</div>
			</section>
		</div>
	)
}

export default RegisterPage