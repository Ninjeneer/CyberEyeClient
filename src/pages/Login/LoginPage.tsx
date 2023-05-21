import logo from '../../assets/logo.png'
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import supabase from "../../api/supabase"
import { useEffect } from 'react'
import { useAuth } from '../../contexts/Auth'
import { useNavigate } from 'react-router-dom'
import fr from './fr.json'

const LoginPage = () => {
	const { session } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (session?.user?.id) {
			navigate('/')
		}
	}, [session])
	
	return (
		<div className="w-full h-full flex justify-center items-center bg-bgLight overflow-y-auto">
			<section className="w-full md:w-1/3 flex flex-col m-auto p-10 bg-white shadow gap-10">
				<div className="flex flex-col items-center gap-2">
					<img src={logo} width={100} />
					<h1 className="text-3xl">Cyber Eye</h1>
				</div>
				<Auth
					supabaseClient={supabase}
					appearance={{
						theme: ThemeSupa,
						variables: {
							default: {
								colors: {
									brand: '#0094FF',
									brandAccent: '#006aff',
								},
							},
						},
					}}
					localization={{
						variables: fr
					}}
					providers={['google']}
				/>
			</section>
		</div>
	)
}

export default LoginPage