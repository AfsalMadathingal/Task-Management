import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({Element}) => {
    
  const token = localStorage.getItem("token");



  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Element />;
};

export default ProtectedRoute;
