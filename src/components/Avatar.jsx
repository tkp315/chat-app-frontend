/* eslint-disable no-unused-vars */


 // eslint-disable-next-line react/prop-types
 function Avatar({w,h,src}) {
  return (
    <div className="avatar ">
      <div className={`  ${w?`w-${w}`:`w-14`}  ${h?`h-${h}`:`h-14`} rounded-full`}>
      <img src={src?src:""} alt="" />
      </div>
    </div>
  )
}
export default Avatar