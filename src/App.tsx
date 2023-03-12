import { Outlet } from 'react-router-dom'
import Menu from './components/NavBar/NavBar'

const Root = () => {
    return (
        <div className='flex flex-col md:flex-row h-full'>
            <aside className='w-80 md:max-w-sm'>
                <Menu />
            </aside>

            <div className='w-full mx-auto bg-bgLight h-full overflow-auto'>
                <Outlet />
            </div>
        </div>

    )
}

export default Root