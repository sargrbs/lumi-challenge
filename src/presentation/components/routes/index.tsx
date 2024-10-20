import Route from './route'
import BaseLayout from '../layouts/base'
import Home from '../../pages/home'
import Dashboard from '../../pages/dashboard'
import InvoiceLibrary from '../../pages/invoiceLibrary'
import InvoiceDownload from '../../pages/invoiceDownload'
import ProtectedRoute from '../../components/security/protected-route'
// import Login from '../../pages/login'
import { SignIn, SignUp } from '@clerk/clerk-react'

const Routes = () => {
  const routes = [
    {
      layout: BaseLayout,
      data: [
        {
          path: '/login/*',
          component: SignIn,
        },
        {
          path: '/sign-up/*',
          component: SignUp,
        },
        {
          path: '/',
          component: ProtectedRoute,
          children: [
            { path: '/', component: Home },
            { path: '/dashboard', component: Dashboard },
            { path: '/invoices', component: InvoiceLibrary },
            { path: '/invoices-download', component: InvoiceDownload },
          ],
        },
      ],
    },
  ]
  return <Route data={routes} />
}

export default Routes
