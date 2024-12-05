import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({Element}) => {
    
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/" />;
  }

  return <Element />;
};

export default PublicRoute;

