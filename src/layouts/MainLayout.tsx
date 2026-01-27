import React from 'react';
import { Grid } from 'antd';
import { Outlet } from 'react-router-dom';
import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';

const { useBreakpoint } = Grid;

const MainLayout: React.FC = () => {
  const screens = useBreakpoint();
  
  // Ant Design Grid: screens.md is true for >= 768px
  // We can consider 'md' or 'lg' as desktop. Let's start with 'md'.
  const isDesktop = screens.md;

  // Initial render screens might be empty, so defaulted to false (mobile) or check if object is empty
  // useBreakpoint returns empty object initially in some versions, but we should handle it.
  
  // If undefined (SSR or initial load), default to mobile usually or handle loading.
  
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
};

export default MainLayout;
