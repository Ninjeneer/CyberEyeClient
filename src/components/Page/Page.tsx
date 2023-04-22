import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { FaChevronLeft, FaUser } from 'react-icons/fa'
import { useCallback } from 'react'
import cx from 'classnames'
import Popover from '../Popover/Popover'
import { useAuth } from '../../contexts/Auth'
import supabase from '@supabase/supabase-js'
import api from '../../api/api'

type Props = {
	pageTitle: string
	children: React.ReactNode
	footer?: React.ReactNode
	canGoPrevious?: boolean
	additionalStyle?: string
}

const Page = ({ pageTitle, children, footer, canGoPrevious, additionalStyle }: Props) => {

	const navigate = useNavigate()
	const goBack = useCallback(() => navigate(-1), [])
	const session = useAuth()

	const logout = useCallback(() => {
		api.auth.logout()
	}, [])

	return (
		<section>
			<header className="p-2 bg-white mb-10 shadow flex justify-between items-center h-16">
				<h1 className="flex gap-2 text-3xl p-2">
					{canGoPrevious ? <FaChevronLeft onClick={goBack} className='hover:cursor-pointer hover:text-primary duration-300' /> : null} 
					{pageTitle}
				</h1>
				<Popover.PopoverContainer>
					<Popover.Trigger>
						<FaUser size={30}/>
					</Popover.Trigger>

					<Popover.Item onClick={logout}>Déconnexion</Popover.Item>
				</Popover.PopoverContainer>
			</header>

			<div className="bg-white shadow w-full md:w-4/5 m-auto">
				<div className={cx("p-4", additionalStyle)}>
					{children}
				</div>

				{footer ? (
					<footer className="border-t-2 mt-8 p-2 flex items-center">
						{footer}
					</footer>
				) : null}
			</div>
		</section>
	)
}

export default Page