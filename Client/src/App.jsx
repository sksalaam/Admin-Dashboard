import { Login, Register } from "./Pages/Auth"
import { Routes, Route } from "react-router-dom"
import CheckAuth from "./components/Common/Auth"
import AuthLayout from "./Layouts/Auth/AuthLayout";
import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import AdminLayout from "./Layouts/Admin/AdminLayout";
import { Dashboard, Employees } from "./Pages/Admin";
import { check_Auth } from "./Store/Auth-Slice";
import { Skeleton } from "@/components/ui/skeleton"



function App() {

  const {isAuthenticated, isLoading} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{ 
    dispatch(check_Auth())
  },[dispatch]);

  if (isLoading) return <Skeleton className="w-[800] h-[600] bg-black" />
 
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}            
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} >
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
         
         
        </Route>
        
      </Routes>

    </div>
    
  )
}


export default App
