import {Navigate, useLocation} from 'react-router-dom'
export default function CheckAuth({isAuthenticated, children}) {
    const location = useLocation();
  
    if (location.pathname === "/") {
        if (!isAuthenticated) {
          return <Navigate to="/auth/login" />;
        } else return <Navigate to = "admin/dashboard" />;
        
    }
    if (
        !isAuthenticated &&
        !(
          location.pathname.includes("/login") ||
          location.pathname.includes("/register")
        )
      ) return <Navigate to="/auth/login" />;
      

      if (
        isAuthenticated &&
        (location.pathname.includes("/login") ||
          location.pathname.includes("/register"))
      ) return <Navigate to="/admin/dashboard" />;


  return (
         <>{children}</>
  )
}
