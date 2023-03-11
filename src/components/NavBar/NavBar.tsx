import { NavLink } from "react-router-dom"
import style from './Style.module.css'
import cx from 'classnames'
import { MdDashboard } from "react-icons/md";
import { AiFillSecurityScan } from "react-icons/ai";
import { FaList } from "react-icons/fa";

const links = [
	{ name: 'Tableau de bord', path: '/', icon: <MdDashboard size={30} />},
	{ name: 'Nouveau scan', path: '/new-scan', icon: <AiFillSecurityScan size={30} />},
	{ name: 'Mes scans', path: '/scans', icon: <FaList size={30} />},
]

const NavBar = () => {

	return (
		<nav className="h-full border-r-primary border-r-4 flex">
			{/* <div className="bg-primary w-20 flex flex-col justify-between">
				<p>lol</p>
			</div> */}
			<div className="flex flex-col w-full">
				<h1><span className={style.icon}>a</span>Cyber Eye</h1>

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

			<div></div>
		</nav>
	)
}

export default NavBar