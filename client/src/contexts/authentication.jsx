import React, { useState } from "react";
import { login as loginApi, register as registerApi } from "../api/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });

  const login = async ({ username, password }) => {
    // 🐨 Todo: Exercise #4
    //  ให้เขียน Logic ของ Function `login` ตรงนี้
    //  Function `login` ทำหน้าที่สร้าง Request ไปที่ API POST /login
    //  ที่สร้างไว้ด้านบนพร้อมกับ Body ที่กำหนดไว้ในตารางที่ออกแบบไว้
    try {
      const res = await loginApi({ username, password });
      if (res.success) {
        setState({
          loading: false,
          error: null,
          user: res.user,
        });
        localStorage.setItem("token", res.token);
        navigate("/")
      } else {
        setState({
          loading: false,
          error: res.message,
          user: null,
        });
      }
    } catch (error) {
      setState({
        loading: false,
        error: error.message,
        user: null,
      });
    }
  };

  const register = async ({ username, firstName, lastName, password }) => {
    // 🐨 Todo: Exercise #2
    //  ให้เขียน Logic ของ Function `register` ตรงนี้
    //  Function register ทำหน้าที่สร้าง Request ไปที่ API POST /register
    //  ที่สร้างไว้ด้านบนพร้อมกับ Body ที่กำหนดไว้ในตารางที่ออกแบบไว้
    try {
      const res = await registerApi({ username, firstName, lastName, password });
      if (res.success) {
        console.log(res)
        navigate('/login')
      } else {
        setState({
          loading: false,
          error: res.message,
          user: null,
        });
      }
    } catch (error) {
      setState({
        loading: false,
        error: error.message,
        user: null,
      });
    }
  };

  const logout = () => {
    // 🐨 Todo: Exercise #7
    //  ให้เขียน Logic ของ Function `logout` ตรงนี้
    //  Function logout ทำหน้าที่ในการลบ JWT Token ออกจาก Local Storage
    localStorage.removeItem("token");
    setState({
      loading: false,
      error: null,
      user: null,
    });
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ state, login, logout, register, isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
