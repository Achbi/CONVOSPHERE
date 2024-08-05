import {useState} from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading,setLoading] = useState(false);
    const {authUser,setAuthUser} = useAuthContext()
    
    const login = async (username,password) =>{
         const success = handleInputErrors(username,password);
         if(!success) return;
        setLoading(true);
        try{
            const res =await fetch("/api/auth/login",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username, password})

            });
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error || "signup failed");
            }
            
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
            console.log(data);
            toast.success("Login successfull!");
        }catch(error){
           toast.error(error.message);
        }finally{
            setLoading(false);
        }

    };
    return {loading,login};
}
export default useLogin;



function handleInputErrors(
username, password
){
    if(!username||!password){
        toast.error("please fill all the fields");
        return false;
    }
    return true;

}