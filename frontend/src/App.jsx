import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MasterHome from './pages/Master/MaserHome';
import MasterCustomer from './pages/Master/MasterCustomer';
import MasterItem from './pages/Master/MasterItem';
import MasterCreateCustomer from './pages/Master/MasterCreateCustomer';
import MasterCreateItem from './pages/Master/MasterCreateItem';
import BillingHome from './pages/Billing/BillingHome';
import BillingGenerate from './pages/Billing/BillingGenerate';
import Invoice from './pages/Invoice/Invoice';
import Dashboard from './pages/Dashboard/Dashboard';
import Layout from './pages/Layout/Layout';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "invoice/:id",
        element: <Invoice />
      },
      {
        path: "master",
        element: <MasterHome />,
      },
      {
        path: "billing",
        element: <BillingHome />,
      },
      {
        path:'/master/customers',
        element: <MasterCustomer/>
      },
      {
        path:'/master/items',
        element: <MasterItem />
      },
      {
        path:'/master/items/createItem',
        element: <MasterCreateItem />
      },
      {
        path:'/master/customers/createCustomer',
        element: <MasterCreateCustomer/>
      },
      {
        path:'/billing/:id',
        element: <BillingGenerate />
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;