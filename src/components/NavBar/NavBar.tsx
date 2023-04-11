import { NavLink } from "react-router-dom"
import style from './Style.module.css'
import cx from 'classnames'
import { MdDashboard, MdSettings } from "react-icons/md";
import { AiFillSecurityScan } from "react-icons/ai";
import { FaFile, FaList } from "react-icons/fa";
import logo from '../../assets/logo.png'
import { RiRadarFill } from 'react-icons/ri'

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

	return (
		<nav className="h-full border-r-primary border-r flex">
			<div className="flex flex-col w-full justify-between py-2">
				<div>
					<div className="flex items-center">
						<img src={logo} className={style.icon} />
						<h1 className="text-3xl text-center w-full">Cyber Eye</h1>
					</div>

					<div className="mt-40">
						{links.map((link) => (
							<NavLink
								to={link.path}
								key={link.path}
								className={({ isActive }) => cx(style.navLink, "flex items-center py-2 w-full", isActive && style.active)}
							>
								<span className={style.icon}>{link.icon}</span>
								<span className="px-2">{link.name}</span>
							</NavLink>
						))}
					</div>
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
			</div>
		</nav>
	)
}

export default NavBar