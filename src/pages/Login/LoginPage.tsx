import { useState } from "react"
import logo from '../../assets/logo.png'
import Button from "../../components/Button/Button"
import api from "../../api/api"
import { NavLink, useNavigate } from "react-router-dom"

const LoginPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate();

	const handleLogin = () => {
		setLoading(true)
		api.auth.login(email, password)
			.then((res) => {
				console.log(res)
			})
			.finally(() => {
				setLoading(false)
				navigate('/')
			})
	}

	return (
		<div className="w-full h-full flex justify-center items-center bg-bgLight">
			<section className="w-full md:w-1/3 flex flex-col m-auto p-10 bg-white shadow gap-10">
				<div className="flex flex-col items-center gap-2">
					<img src={logo} width={100} />
					<h1 className="text-3xl">Cyber Eye</h1>
				</div>

				<div className="flex flex-col gap-4">
					<div className="inputGroup">
						<label>Adresse e-mail</label>
						<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Entrez votre adresse e-mail" disabled={loading} />
					</div>

					<div className="inputGroup">
						<label>Mot de passe</label>
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Entrez votre mot de passe" disabled={loading} />
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<Button type="primary" text="Se connecter" onClick={handleLogin} disabled={loading} />
					<NavLink to='/register' className='link'>Pas de compte ? <b>Inscrivez vous</b></NavLink>
				</div>
			</section>
		</div>
	)
}

export default LoginPage