import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRouter from "./router/PrivateRouter";
import Home from "./pages/Home";
import Appbar from "./components/AppBar";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';


function App() {
  const { loginInformation } = useSelector((state) => state.loginInfo)
  return (
    <>
    <ToastContainer />
    {loginInformation && <Appbar />}
    <Routes>
        <Route  path="/" element={<Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRouter />} >
          <Route path="" element={<Home />}/>
        </Route>
    </Routes>
  
    </>
    
  );
}

export default App;
