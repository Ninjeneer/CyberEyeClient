import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/Dashboard/DashboardPage'
import NewScanPage from './pages/NewScan/NewScanPage'
import ConfirmScanPage from './pages/ConfirmScan/ConfirmScanPage'
import ScanListPage from './pages/ScanList/ScanListPage'
import ScanResult from './pages/ScanResult/ScanResultPage'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import { AuthProvider } from './contexts/Auth'
import { PrivateRoute } from './PrivateRoute'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          <Route path='/' element={<PrivateRoute />}>
            <Route path='/' element={<App />}>
              <Route path='/' element={<DashboardPage />} />
              <Route path='/new-scan' element={<NewScanPage />} />
              <Route path='/confirm-scan' element={<ConfirmScanPage />} />
              <Route path='/scans' element={<ScanListPage />} />
              <Route path='/scans/:id' element={<ScanResult />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
