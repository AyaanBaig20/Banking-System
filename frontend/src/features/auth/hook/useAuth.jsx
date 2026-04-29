import { signup ,Login} from "../services/auth.services";
import { setLoading, setUser } from "../redux/features/authSlices";
import { useDispatch, useSelector } from "react-redux";

export let useAuth = () => {
  let dispatch = useDispatch();
  const handleSignup = async ({ name, email, password }) => {
    try {
      dispatch(setLoading(true));

      let res = await signup({ name, email, password });

      if (res.success) {
        dispatch(setUser(res.newuser));
      }

      return res;
    } catch (err) {
      console.log(err);
      return { success: false, message: "Something went wrong" };
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleLogin=async({email,password})=>{
    try {
      dispatch(setLoading(true))
      let res = await Login({email,password})
      if(res.success){
        dispatch(setUser(res.user))
        dispatch(setLoading(false))
      }
      return res
    } catch (err) {
      console.log(err);
      return { success: false, message: "Something went wrong" };
    } finally {
      dispatch(setLoading(false));
    }
  }
  return { handleSignup,handleLogin };
};
