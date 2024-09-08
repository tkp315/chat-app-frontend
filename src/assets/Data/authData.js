const otp = [
    {
        type:"text",
        label:"Email",
        name:"email",
        placeholder:"Email"
    }
]

const singupData=[
    {
        type:"text",
        label:"Full Name",
        name:"fullName",
        placeholder:"Full Name"
    },
    {
        type:"password",
        label:"Password",
        name:"password",
        placeholder:"password"
    },
    {
        type:"password",
        label:"confirm Password",
        name:"confirmPassword",
        placeholder:"confirmPassword"
    },
    {
        type:"text",
        label:"OTP",
        name:"otp",
        placeholder:'OTP'
    },
  
    {
        type:"email",
        label:"Email",
        name:"email",
        placeholder:'Email'
    },
]

const loginData =[
    {
        type:"email",
        label:"Email",
        name:"email",
        placeholder:'Email'
    },
    {
        type:"password",
        label:"Password",
        name:"password",
        placeholder:"password"
    }
]
const reset_token = [
    {
        type:"text",
        label:"Email",
        name:"email",
        placeholder:"Email"
    }
]

const reset_password=[
    {
        type:"text",
        label:"Reset-Token",
        name:"token",
        placeholder:"Password-Reset-Token"
    },
    {
        type:"password",
        label:"New Password",
        name:"newPass",
        placeholder:"New password"
    },
    {
        type:"password",
        label:"confirm Password",
        name:"confirmPassword",
        placeholder:"confirmPassword"
    }

]

export {otp,singupData,loginData,reset_token,reset_password}