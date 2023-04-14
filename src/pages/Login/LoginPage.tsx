import { useState } from "react"
import logo from '../../assets/logo.png'
import Button from "../../components/Button/Button"
import api from "../../api/api"
import { NavLink, useNavigate } from "react-router-dom"
import { handleEnterKey } from "../../utils/form.utils"

const LoginPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const navigate = useNavigate();

	const handleLogin = () => {
		setError('')
		setLoading(true)
		api.auth.login(email, password)
			.then((res) => {
				if (!res.error) {
					navigate('/')
				}

				if (res.error) {
					if (res.error.name === 'AuthApiError') {
						setError(`Nom d'utilisateur ou mot de passe incorrect`)
					} else {
						setError(res.error.message)
					}
				}
			})
			.finally(() => {
				setLoading(false)
			})
	}

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
							onKeyDown={(e) => handleEnterKey(e, handleLogin)}
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
							onKeyDown={(e) => handleEnterKey(e, handleLogin)}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<Button type="primary" onClick={handleLogin} disabled={loading}>Se connecter</Button>
					<NavLink to='/register' className='link'>Pas de compte ? <b>Inscrivez vous</b></NavLink>
					{error ? <span className="text-danger">{error}</span> : null}
				</div>
			</section>
		</div>
	)
}

export default LoginPage