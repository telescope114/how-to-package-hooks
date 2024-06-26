import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import Count from '../pages/count'
import FetchHooks from '../pages/fetchHooks'
import Pages from '../pages'

const router: RouteObject[] = [
  {
    path: '/',
    element: <Pages/>,
    children: [
      {
        path: '/count',
        element: <Count/>
      },
      {
        path: '/fetch-hooks',
        element: <FetchHooks/>
      }
    ]
  }
];

export default createBrowserRouter(router)
