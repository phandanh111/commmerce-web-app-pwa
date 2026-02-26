import React, { type ReactNode } from 'react';
import { Layout } from 'antd';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './styles.module.scss';

const { Content } = Layout;

type Props = {
  children: ReactNode;
};

function DesktopLayout({ children }: Props) {
  return (
    <Layout className={styles.desktopLayout}>
      <Header />
      <Content className={styles.content}>
        {children}
      </Content>
      <Footer />
    </Layout>
  );
}

export default React.memo(DesktopLayout);
