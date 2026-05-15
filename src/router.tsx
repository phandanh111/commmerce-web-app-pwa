import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import { Spin } from 'antd';

import MainLayout from '@/layouts/MainLayout';
import PrivateRoute from '@/components/common/PrivateRoute';
import { ROUTES } from '@/constants/router';

const fallback = <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}><Spin size="large" /></div>;

const HomePage        = lazy(() => import('@/pages/Home'));
const AboutPage       = lazy(() => import('@/pages/About'));
const ProductsPage    = lazy(() => import('@/pages/Products'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetail'));
const NewsPage        = lazy(() => import('@/pages/News'));
const ShowroomPage    = lazy(() => import('@/pages/Showroom'));
const ContactPage     = lazy(() => import('@/pages/Contact'));
const CartPage        = lazy(() => import('@/pages/Cart'));
const CheckoutPage    = lazy(() => import('@/pages/Checkout'));
const LoginPage       = lazy(() => import('@/pages/Login'));
const RegisterPage    = lazy(() => import('@/pages/Register'));
const ProfileLayout   = lazy(() => import('@/pages/Profile'));
const ProfileInfo     = lazy(() => import('@/pages/Profile/ProfileInfo'));
const Orders          = lazy(() => import('@/pages/Profile/Orders'));
const Wishlist        = lazy(() => import('@/pages/Profile/Wishlist'));
const Addresses       = lazy(() => import('@/pages/Profile/Addresses'));
const ChangePassword  = lazy(() => import('@/pages/Profile/ChangePassword'));

const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: ROUTES.HOME,           element: <Suspense fallback={fallback}><HomePage /></Suspense> },
      { path: ROUTES.ABOUT,          element: <Suspense fallback={fallback}><AboutPage /></Suspense> },
      { path: ROUTES.PRODUCTS,       element: <Suspense fallback={fallback}><ProductsPage /></Suspense> },
      { path: ROUTES.PRODUCT_DETAIL, element: <Suspense fallback={fallback}><ProductDetailPage /></Suspense> },
      { path: ROUTES.NEWS,           element: <Suspense fallback={fallback}><NewsPage /></Suspense> },
      { path: ROUTES.SHOWROOM,       element: <Suspense fallback={fallback}><ShowroomPage /></Suspense> },
      { path: ROUTES.CONTACT,        element: <Suspense fallback={fallback}><ContactPage /></Suspense> },
      { path: ROUTES.LOGIN,          element: <Suspense fallback={fallback}><LoginPage /></Suspense> },
      { path: ROUTES.REGISTER,       element: <Suspense fallback={fallback}><RegisterPage /></Suspense> },
      {
        path: ROUTES.CART,
        element: <PrivateRoute><Suspense fallback={fallback}><CartPage /></Suspense></PrivateRoute>,
      },
      {
        path: ROUTES.CHECKOUT,
        element: <PrivateRoute><Suspense fallback={fallback}><CheckoutPage /></Suspense></PrivateRoute>,
      },
      {
        element: <PrivateRoute><Suspense fallback={fallback}><ProfileLayout /></Suspense></PrivateRoute>,
        children: [
          { path: ROUTES.PROFILE,         element: <Suspense fallback={fallback}><ProfileInfo /></Suspense> },
          { path: ROUTES.ORDERS,          element: <Suspense fallback={fallback}><Orders /></Suspense> },
          { path: ROUTES.WISHLIST,        element: <Suspense fallback={fallback}><Wishlist /></Suspense> },
          { path: ROUTES.ADDRESSES,       element: <Suspense fallback={fallback}><Addresses /></Suspense> },
          { path: ROUTES.CHANGE_PASSWORD, element: <Suspense fallback={fallback}><ChangePassword /></Suspense> },
        ],
      },
      { path: '*', element: <Navigate to={ROUTES.HOME} /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
