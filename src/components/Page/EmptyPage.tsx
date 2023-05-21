import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { FaChevronLeft, FaPowerOff, FaUser, FaWrench } from 'react-icons/fa'
import { useCallback } from 'react'
import api from '../../api/api'
import Popover from '../Popover/Popover'
import styles from './Style.module.css'

type Props = {
	pageTitle: string
	children: React.ReactNode
	canGoPrevious?: boolean
}

const EmptyPage = ({ pageTitle, children, canGoPrevious }: Props) => {

	const navigate = useNavigate()

	const goBack = useCallback(() => navigate(-1), [])
	const goToSettings = useCallback(() => navigate('/settings'), [])


	const logout = useCallback(async () => {
		await api.auth.logout()
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
						<FaUser size={30} />
					</Popover.Trigger>

					<Popover.Item onClick={goToSettings}><span className={styles.itemContainer}><FaWrench /> Paramètres</span></Popover.Item>
					<Popover.Item onClick={logout}><span className={styles.itemContainer}><FaPowerOff /> Déconnexion</span></Popover.Item>
				</Popover.PopoverContainer>			
			</header>

			{children}
		</section>
	)
}

export default EmptyPage