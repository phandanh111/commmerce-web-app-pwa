import { lazy } from 'react';

import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';
import { ROUTES } from '@/constants/router';

const HomePage = lazy(() => import('@/pages/Home'));
const AboutPage = lazy(() => import('@/pages/About'));
const ProductsPage = lazy(() => import('@/pages/Products'));
const NewsPage = lazy(() => import('@/pages/News'));
const ShowroomPage = lazy(() => import('@/pages/Showroom'));
const ContactPage = lazy(() => import('@/pages/Contact'));

const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTES.ABOUT,
        element: <AboutPage />,
      },
      {
        path: ROUTES.PRODUCTS,
        element: <ProductsPage />,
      },
      {
        path: ROUTES.NEWS,
        element: <NewsPage />,
      },
      {
        path: ROUTES.SHOWROOM,
        element: <ShowroomPage />,
      },
      {
        path: ROUTES.CONTACT,
        element: <ContactPage />,
      },
      { path: '*', element: <Navigate to={ROUTES.HOME} /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
