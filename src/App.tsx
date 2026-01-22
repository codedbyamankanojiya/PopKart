import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ index: true, element: <Home /> }],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors closeButton position="top-right" />
    </>
  );
}
