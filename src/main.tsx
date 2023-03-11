import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import DashboardPage from './pages/Dashboard/DashboardPage'
import NewScanPage from './pages/NewScan/NewScanPage'
import ConfirmScanPage from './pages/ConfirmScan/ConfirmScanPage'
import ScanListPage from './pages/ScanList/ScanListPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <DashboardPage /> },
      { path: '/new-scan', element: <NewScanPage /> },
      { path: '/confirm-scan', element: <ConfirmScanPage /> },
      { path: '/scans', element: <ScanListPage /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
