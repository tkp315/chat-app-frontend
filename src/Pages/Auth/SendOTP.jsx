
import AuthTemplate from '../../components/AuthTemplate'
import { otp } from '../../assets/Data/authData'
import { useDispatch } from 'react-redux'
import { sendOTPThunk } from '../../Redux/Slices/userSlice';
import { useNavigate } from 'react-router-dom';
export default function SendOTP() {

const dispatch = useDispatch();
const navigate = useNavigate();
const handleOtp=async (data)=>{
    const res = await dispatch(sendOTPThunk(data))
    console.log(res)
    if(res.payload.statusCode===200){
    navigate("/signup")
    }
}

  return (
    <div>
      <AuthTemplate arr={otp} isAvatar={false} btnTyp={`primary`} formName={`OTP` } btnContent={`Send OTP`}
      submitHandler={handleOtp}></AuthTemplate>
    </div>
  )
}
