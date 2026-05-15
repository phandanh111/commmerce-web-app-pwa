import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAppDispatch, useAppSelector } from '@/stores/Store';
import { fetchProfile } from '@/stores/slices/authSlice';
import { fetchCart } from '@/stores/slices/cartSlice';
import { fetchWishlist } from '@/stores/slices/wishlistSlice';
import styles from './styles.module.scss';

function MainLayout() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile());
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default React.memo(MainLayout);
