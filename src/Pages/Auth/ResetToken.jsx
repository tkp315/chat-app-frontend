import AuthTemplate from "../../components/AuthTemplate"
import { reset_token } from "../../assets/Data/authData"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sendResetTokenThunk } from "../../Redux/Slices/userSlice"

 function ResetToken() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const sendTokenHandler=async(data)=>{
      const res = await dispatch(sendResetTokenThunk(data))
      console.log(res);

      if(res.payload.statusCode===200){
        navigate("/reset-password")
      }
    }

  return (
    <div>
      <AuthTemplate 
      arr={reset_token}
      isAvatar={false} 
      btnTyp="accent"
       btnContent="Send Token"
        formName="Password Reset Token" 
        submitHandler={sendTokenHandler}
        extra={false}
      ></AuthTemplate>
    </div>
  )
}
export default ResetToken