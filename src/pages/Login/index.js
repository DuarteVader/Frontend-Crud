import React, { useState } from 'react'
import './login.css'

import { MdEmail, MdHttps } from "react-icons/md";
import { HiEye, HiOutlineEyeOff } from "react-icons/hi";

function Login (){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setShow(!show);
  }
  
  return (
    <div className= "login">

      <div className="login-right">
        <img className = "imagem"src="https://image.flaticon.com/icons/png/512/181/181534.png" alt="Login App" />


        <div className="login-InputEmail">
          <MdEmail/>
          <input type="email"
                 placeholder = "Digite um email ou CPF" 
                 value = {email}
                 onChange ={e => setEmail(e.target.value)}
                 />
        </div>
        <div className="login-InputPassword">
          <MdHttps/>
          <input type={show ? "text" : "password"}
                 placeholder = "Digite sua senha" 
                 value = {password}
                 onChange ={e => setPassword(e.target.value)}
                 />
                 <div className="login-eye">
                   {show ? (
                     <HiEye 
                        size = {20}
                        onClick = {handleClick}
                     />
                   ) : (
                     <HiOutlineEyeOff 
                        size = {20}
                        onClick = {handleClick}
                     />
                   )}
                 </div>
        </div>
        
        <button type= "submit">
          Entrar
        </button>

        <h4>Não tem cadastro?</h4>

        <button type="submit">
          Cadastrar-se
        </button>
      </div>
    </div>
  )
}
export default Login