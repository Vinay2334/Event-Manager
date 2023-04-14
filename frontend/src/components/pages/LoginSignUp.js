import React, { Fragment, useRef, useState, useContext } from "react";
import "./LoginSignUp.css";
import { useNavigate } from "react-router-dom";
import {AiOutlineMail} from "react-icons/ai";
import {BiLockOpenAlt} from "react-icons/bi";
import {CgProfile} from "react-icons/cg";
import { AuthContext } from "../context/authContext";

const LoginSignUp = () => {
  const {register, login} = useContext(AuthContext);
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [err, setError] = useState(null);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    avatar:"",
  });

  const { name, email, password } = user;

  const [file, setFile] = useState("/Profile.webp");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.webp");

  const loginSubmit = async(e) => {
    e.preventDefault();
    try{
      await login(loginEmail,loginPassword);
      navigate("/");
    }
    catch(err){
      setError(err.response.data);
    }
  }

  const registerSubmit = async(e) => {
    e.preventDefault();

    // const myForm = new FormData();

    // myForm.set("name", name);
    // myForm.set("email", email);
    // myForm.set("password", password);
    // myForm.set("avatar", file);
    // for (const entry of myForm.entries()) {
    //   console.log(entry);
    // }
    try{
      if(file){
        user.avatar = file;
      }
      await register(user);
      navigate("/");
      }
      catch(err){
        setError(err.response.data);
      }
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setFile(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      <Fragment>
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
            <div>
              <div className="login_signUp_toggle">
                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
              <div className="loginEmail">
                <AiOutlineMail />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <BiLockOpenAlt />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              {err && <p style={{"color":"red"}}>{err}</p>}
              <input type="submit" value="Login" className="loginBtn" />
            </form>
            <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <CgProfile />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="username"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <AiOutlineMail />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <BiLockOpenAlt />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                {err && <p style={{"color":"red"}}>{err}</p>}
                <input type="submit" value="Register" className="signUpBtn" />
            </form>
          </div>
        </div>
      </Fragment>
  </Fragment>
  )
}

export default LoginSignUp