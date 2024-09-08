import AuthTemplate from "../../components/AuthTemplate";
import { loginData } from "../../assets/Data/authData";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../../Redux/Slices/userSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginHandler = async (data) => {
    const res = await dispatch(loginThunk(data));
  console.log(res)
  if(res.payload.statusCode===200)navigate("/")
  };
  return (
    <div className="">
      <AuthTemplate
        arr={loginData}
        isAvatar={false}
        btnTyp={`primary`}
        btnContent="Login"
        formName="Login"
        submitHandler={loginHandler}
        extra={true}
      ></AuthTemplate>
    </div>
  );
}

export default Login;
