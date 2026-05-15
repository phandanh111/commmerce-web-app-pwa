import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/stores/Store';
import { ROUTES } from '@/constants/router';

interface Props { children: React.ReactNode }

export default function PrivateRoute({ children }: Props) {
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
