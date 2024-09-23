import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
<div className="flex min-h-screen w-full bg-gray-50">
  <div className="flex items-center justify-center w-1/2 bg-gray-800 text-white px-12">
    <div className="max-w-md space-y-6 text-center">
      <h1 className="text-6xl font-bold">
        Welcome 
      </h1>
    </div>
  </div>

  <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
      <Outlet />
    </div>
  </div>
</div>

  
  );
};  

export default AuthLayout;