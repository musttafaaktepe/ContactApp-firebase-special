import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRouter from "./router/PrivateRouter";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./redux/app/store";


function App() {
  return (
    <Provider store={store} >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRouter />}>
          <Route path="" element={<Home />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
