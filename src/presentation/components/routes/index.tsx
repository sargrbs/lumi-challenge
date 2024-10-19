import Route from './route'
import BaseLayout from '../layouts/base'
import Home from '../../pages/home'
import Dashboard from '../../pages/dashboard'
import InvoiceLibrary from '../../pages/invoiceLibrary'
import InvoiceDownload from '../../pages/invoiceDownload'

const Routes = () => {
  const routes = [
    {
      layout: BaseLayout,
      data: [
        { path: '/', component: Home },
        { path: '/dashboard', component: Dashboard },
        { path: '/dashboard', component: Dashboard },
        { path: '/invoices', component: InvoiceLibrary },
        { path: '/invoices-download', component: InvoiceDownload },
      ],
    },
  ]
  return <Route data={routes} />
}

export default Routes
