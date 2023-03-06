import { useState, useEffect } from "react";
import LoginTab from "./loginTab";
import SignUpTab from "./signTab"

import "../login.css"


export default function Login(props) {
  const [showLogin, setShowLogin] = useState('');


  function CheckLogin() {
    let token = localStorage.getItem('Token')
    props.setToken(token)
    if (token == null) {
      showLoginModal(false)
    } else { 
      props.update('update') }
  }

  function showLoginModal(value) {
    let modalLogin = document.getElementById("ModalLogin")
    if (value == true) {
      modalLogin.style.visibility = 'hidden';
    } else {
      modalLogin.style.visibility = 'visible';
    }
  }

  function saveToken(data) {
    if (data !== undefined) {
      props.setToken(data)
      showLoginModal(true)
      localStorage.setItem('Token', data)
      props.update('updated')
    } else {
      alert("Usuario ou senha incorretos!")
    }
  }

  useEffect(() => {
    CheckLogin()
  }, []);


  return (
      <div className='modal-background' id='ModalLogin'>
          <div className='login-modal'>

            <div className="div-tabs">
              <div className="tab-login" id="tabActive" onClick={(e) => setShowLogin(true)}> Entrar </div>
              <div className="tab-signup" id="signupTab" onClick={(e) => setShowLogin(false)}> Cadastrar </div>
            </div>

            <LoginTab saveToken={saveToken} show={showLogin} ></LoginTab>

            <SignUpTab saveToken={saveToken} show={showLogin} > </SignUpTab>

          </div>
      </div>
  );
}