import { useState, useEffect } from "react";


export default function LoginTab(props) {

  const [getUsername, setUsername] = useState('');
  const [getPassword, setPassword] = useState('');

  function showLogin() {
    if (props.show == true) {
      let login = document.getElementById("LoginDiv")
      let signup = document.getElementById("SignupDiv")
      let loginTab = document.getElementsByClassName("tab-login")
      let signupTab = document.getElementsByClassName("tab-signup")
  
      login.style.display = "block"
      signup.style.display = "none"
      loginTab[0].setAttribute("id","tabActive")
      signupTab[0].setAttribute("id", "");
    }
  }

  function loginFunc() {
    let url = `http://127.0.0.1:8000/users/login/`
    let json = {
        "username": getUsername,
        "password": getPassword
    }
    fetch(url, {method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(json)})
            .then((res) => res.json())
            .then((data) => props.saveToken(data['token']))
  }

  useEffect(() => {
    showLogin()
  }, [props.show]);

  return (
      <div className="login-div" id="LoginDiv" style={{display: "block"}}>
      <div className='input-align-login'>
              <input type="text" placeholder="Digite seu username" onChange={(e) => setUsername(e.target.value)} name="username"></input>
              <input type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} password="password"></input>

          <div className='btns-div'>
              <button className='btn-modal' onClick={loginFunc}> Entrar </button>
          </div>
      </div>
    </div> 
  );
}