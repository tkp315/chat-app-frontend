import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ResetPasswordThunk } from '../../Redux/Slices/userSlice';
import AuthTemplate from '../../components/AuthTemplate';
import { reset_password } from '../../assets/Data/authData';

export default function ResetPassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const resetPwdHandler=async(data)=>{
      const res = await dispatch(ResetPasswordThunk(data))
      if(res.payload.statusCode===200){
        navigate("/login")
      }
    }
  return (
    <div>
      <AuthTemplate
      arr={reset_password} 
      isAvatar={false} 
      btnTyp="warning"
      btnContent="Reset Password"
      formName="Password Reset"
      submitHandler={resetPwdHandler}
      extra={false}
      ></AuthTemplate>
    </div>
  )
}
