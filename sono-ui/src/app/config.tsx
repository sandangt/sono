import { createBrowserRouter } from 'react-router-dom'
import Home from '@/views/pages/home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
])
