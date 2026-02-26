import React, { Suspense } from 'react';
import { Grid } from 'antd';
import { Outlet } from 'react-router-dom';

import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';

const { useBreakpoint } = Grid;

function MainLayout() {
  const screens = useBreakpoint();
  const isDesktop = screens.md;

  return (
    <Suspense fallback={null}>
      {isDesktop ? (
        <DesktopLayout>
          <Outlet />
        </DesktopLayout>
      ) : (
        <MobileLayout>
          <Outlet />
        </MobileLayout>
      )}
    </Suspense>
  );
}

export default React.memo(MainLayout);
