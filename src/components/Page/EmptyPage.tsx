import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { FaChevronLeft } from 'react-icons/fa'
import { useCallback } from 'react'

type Props = {
	pageTitle: string
	children: React.ReactNode
	canGoPrevious?: boolean
}

const EmptyPage = ({ pageTitle, children, canGoPrevious }: Props) => {

	const navigate = useNavigate()

	const goBack = useCallback(() => navigate(-1), [])

	return (
		<section>
			<header className="p-2 bg-white mb-10 shadow flex justify-between h-16">
				<h1 className="flex gap-2 text-3xl p-2">
					{canGoPrevious ? <FaChevronLeft onClick={goBack} className='hover:cursor-pointer hover:text-primary duration-300' /> : null} 
					{pageTitle}
				</h1>
				<img src={logo} className='h-full'/>
			</header>

			{children}
		</section>
	)
}

export default EmptyPage