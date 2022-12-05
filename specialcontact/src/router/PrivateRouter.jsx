import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const PrivateRouter = () => {
  const navigate=useNavigate();
  const {loginInformation} = useSelector((state)=>state.loginInfo)
  return (
    <div>
      {loginInformation ? <Outlet/> : <Navigate to ="/"/> }
    </div>
  )
}

export default PrivateRouter