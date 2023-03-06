import { useState, useEffect } from "react";


export default function SignUpTab(props) {
  const [getUsername, setUsername] = useState('');
  const [getPassword, setPassword] = useState('');
  const [getPwd, setPwd] = useState('');
  const [getEmail, setEmail] = useState('');


  function showSignup() {
    if (props.show === false) {
      let login = document.getElementById("LoginDiv")
      let signup = document.getElementById("SignupDiv")
      let loginTab = document.getElementsByClassName("tab-login")
      let signupTab = document.getElementsByClassName("tab-signup")
  
      signup.style.display = "block"
      login.style.display = "none"
      loginTab[0].setAttribute('id', "")
      signupTab[0].setAttribute('id', "tabActive")
    }
  }

  function SignUpFunc() {
    let url = `http://127.0.0.1:8000/users/register/`
    let json = {
        "username": getUsername,
        "email": getEmail,
        "password1": getPassword,
        "password2": getPwd,
    }
    fetch(url, {method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(json)})
            .then((res) => res.json())
            .then((data) => props.saveToken(data['token']))
  }

  useEffect(() => {
    showSignup()
  }, [props.show]);

  
  return (
      <div className="login-div" id="SignupDiv">
      <div className='input-align-login'>
              <input type="text" placeholder="Digite seu username" onChange={(e) => setUsername(e.target.value)} name="username"></input>
              <input type="text" placeholder="Digite seu email" onChange={(e) => setEmail(e.target.value)} email="email"></input>
              <input type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} password="password"></input>
              <input type="password" placeholder="Comfirme sua senha" onChange={(e) => setPwd(e.target.value)} pwd="pwd"></input>

          <div className='btns-div'>
              <button className='btn-modal' onClick={SignUpFunc}> Cadastrar </button>
          </div>
      </div>
    </div>
  );
}