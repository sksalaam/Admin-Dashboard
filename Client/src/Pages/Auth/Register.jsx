import CommonForm from "@/components/Common/Form";
import { registerFormControl } from "@/Config/indexx";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/Store/Auth-Slice";
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom";

const initialState ={
    userName :'',
    email: '',
    password: '',
  }

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {toast} = useToast();
  
    const [formData, setFormData] = useState(initialState);
    function onSubmit(event){
        event.preventDefault();
        dispatch(registerUser(formData))
        .then((data)=>{
          if(data?.payload?.success){
            toast({
              title: "Registration Successful",
             })
             navigate('/auth/login')
            }
            else{
              toast({
                title: "Registration Failed!",
                description: 'User already exists',
                status: "error",
                variant: "destructive"
              })
            }
        })
      }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new Account
        </h1>
        <p className="mt-2"> Already have an account?
          <Link className=" ml-2 text-blue-500 font-semibold hover:underline " to="/auth/login">Login</Link>
        </p>
      </div>
     <CommonForm
     formControls={registerFormControl}
     buttonText={'Sign up'}
     formData={formData}
     setFormData={setFormData}     
     onSubmit={onSubmit}
     />
      
    </div>
  )
}

export default Register
