import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/Dashboard/DashboardPage'
import NewScanPage from './pages/NewScan/NewScanPage'
import ConfirmScanPage from './pages/ConfirmScan/ConfirmScanPage'
import ReportsListPage from './pages/ReportList/ReportListPage'
import ReportViewPage from './pages/ReportView/ReportViewPage'
import LoginPage from './pages/Login/LoginPage'
import { AuthProvider } from './contexts/Auth'
import { PrivateRoute } from './PrivateRoute'
import ScanListPage from './pages/ScanList/ScanListPage'
import EditScanPage from './pages/EditScan/EditScanPage'
import SelectPlanPage from './pages/SelectPlan/SelectPlan'
import SettingsPage from './pages/Settings/SettingsPage'
import CheckoutSuccessPage from './pages/Checkout/CheckoutSuccess'
import CheckoutCancelPage from './pages/Checkout/CheckoutCancel'
import { GlobalProvider } from './contexts/Global'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/auth' element={<LoginPage />} />
            <Route path='/select-plan' element={<SelectPlanPage />} />

            <Route path='/checkout/success' element={<CheckoutSuccessPage />} />
            <Route path='/checkout/cancel' element={<CheckoutCancelPage />} />

            <Route path='/' element={<PrivateRoute />}>
              <Route path='/' element={<App />}>
                <Route path='/' element={<DashboardPage />} />
                <Route path='/new-scan' element={<NewScanPage />} />
                <Route path='/confirm-scan' element={<ConfirmScanPage />} />
                <Route path='/reports' element={<ReportsListPage />} />
                <Route path='/reports/:id' element={<ReportViewPage />} />
                <Route path='/scans' element={<ScanListPage />} />
                <Route path='/scans/:id' element={<EditScanPage />} />
                <Route path='/settings' element={<SettingsPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </AuthProvider>
  </React.StrictMode>,
)
