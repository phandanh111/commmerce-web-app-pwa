import React from 'react';
import { Grid } from 'antd';
import { Outlet } from 'react-router-dom';

import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';

const { useBreakpoint } = Grid;

function MainLayout() {
  const screens = useBreakpoint();
  const isDesktop = screens.md;

  return (
    <>
      {isDesktop ? (
        <DesktopLayout>
          <Outlet />
        </DesktopLayout>
      ) : (
        <MobileLayout>
          <Outlet />
        </MobileLayout>
      )}
    </>
  );
}

export default React.memo(MainLayout);
