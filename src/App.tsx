import { Outlet } from 'react-router-dom'
import Menu from './components/NavBar/NavBar'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
    return (
        <div className='flex flex-col md:flex-row h-full'>
            <aside className='w-full md:w-80 md:max-w-sm'>
                <Menu />
            </aside>

            <div className='w-full mx-auto bg-bgLight h-full overflow-auto'>
                <Outlet />
            </div>

            <ToastContainer position='bottom-center' autoClose={2000} pauseOnFocusLoss={false} pauseOnHover={true} />
        </div>

    )
}

export default Root