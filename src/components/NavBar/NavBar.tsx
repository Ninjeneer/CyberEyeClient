import { NavLink } from "react-router-dom"
import style from './Style.module.css'
import cx from 'classnames'
import { MdDashboard, MdSettings } from "react-icons/md";
import { AiFillSecurityScan } from "react-icons/ai";
import { FaFile, FaList } from "react-icons/fa";
import logo from '../../assets/logo.png'
import { RiRadarFill } from 'react-icons/ri'
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx'
import { useMemo, useState } from "react";
import { MD_WIDTH, useWindowSize } from "../../hooks/windowSize";

const links = [
	{ name: 'Tableau de bord', path: '/', icon: <MdDashboard size={30} /> },
	{ name: 'Nouveau scan', path: '/new-scan', icon: <AiFillSecurityScan size={30} /> },
	{ name: 'Mes scans', path: '/scans', icon: <RiRadarFill size={30} /> },
	{ name: 'Mes rapports', path: '/reports', icon: <FaList size={30} /> },
]

const bottomLinks = [
	{ name: 'Paramètres', path: '/settings', icon: <MdSettings size={30} /> },
]

const NavBar = () => {

	const windowSize = useWindowSize()
	const [toggleMenu, setToggleMenu] = useState(false)

	const isMenuTogglable = useMemo(() => windowSize.width < MD_WIDTH, [windowSize.width])

	return (
		<nav className="flex md:h-full border-b border-b-primary md:border-b-0 md:border-r-primary border-r">
			<div className="flex flex-col w-full md:justify-between py-2">
				<div className="flex items-center justify-between md:justify-start">
					<img src={logo} className={style.icon} />
					<h1 className="text-3xl text-center w-full">Cyber Eye</h1>
					<span className="md:hidden mr-2" onClick={() => setToggleMenu(!toggleMenu)}>
						{ toggleMenu ? <RxCross1 size={40} /> : <RxHamburgerMenu size={40} /> }
					</span>
				</div>

				{!isMenuTogglable || toggleMenu ? (
					<>
						<div className="md:-mt-80">
							{
								links.map((link) =>
									<NavLink
										to={link.path}
										key={link.path}
										className={({ isActive }) => cx(style.navLink, "flex items-center py-2 w-full", isActive && style.active)}
										onClick={() => setToggleMenu(false)}
									>
										<span className={style.icon}>{link.icon}</span>
										<span className="px-2">{link.name}</span>
									</NavLink>
								)
							}
						</div>

						{bottomLinks.map((link) => (
							<NavLink
								to={link.path}
								key={link.path}
								className={({ isActive }) => cx(style.navLink, "flex items-center py-2 w-full", isActive && style.active)}
							>
								<span className={style.icon}>{link.icon}</span>
								<span className="px-2">{link.name}</span>
							</NavLink>
						))}
					</>
				) : null}
			</div>
		</nav>
	)
}

export default NavBar