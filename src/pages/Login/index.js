import React, { useState, useEffect } from 'react';
import './login.css';
import api from '../../services/api';

import { MdEmail, MdHttps } from 'react-icons/md';
import { HiEye, HiOutlineEyeOff } from 'react-icons/hi';

import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [level, setLevel] = useState(null);
  const [teste, setTeste] = useState(false);

  function linkCadastro() {
    history.push('/cadastrar');
  }


  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  function linkUser() {
    history.push('/homeuser');
  }
  function linkAdm() {
    history.push('/homeadm');
  }

  function testinho() {
    console.log('clicou');
    if (teste === false) {
      setTeste(true);
    } else {
      setTeste(false);
    }
  }

  async function logar() {
    try {
      const response = await api.post('/auth/login', {
        cpf,
        email,
        password,
      });
      const { user, token } = response.data;
      await localStorage.setItem('token', token);
      await localStorage.setItem('user', JSON.stringify(user));
      await localStorage.setItem("id", user._id)
      await localStorage.setItem("level", user.level)
      setLevel(user.level);
      if (user.level === 1) {
        linkUser();
      } else if( user.level === 999) {
        linkAdm();
      } else {
        window.alert('Usuario desativado')
        
      }

      console.log('logou');
    } catch (response) {
      console.log(response);
    }
  }

  return (
    <div className="login">
      <div className="login-right">
        <img
          className="imagem"
          src="https://mindconsulting.com.br/wp-content/uploads/2020/01/Mind-Branco-copy.png"
          alt="Login App"
        />
        <button className="trocaCpfEmail" onClick={() => testinho()}> Trocar para Cpf ou Email </button>
        {teste === true? (
          <div className="login-InputEmail">
          <MdEmail />
          <input
            type="usuario"
            placeholder="Digite um Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        ) : (
          <div className="login-InputEmail">
            <MdEmail />
            <input
              type="usuario"
              placeholder="Digite um CPF"
              formatar = '999.999.999-99'
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
        )}
        <div className="login-InputPassword">
          <MdHttps />
          <input
            type={show ? 'text' : 'password'}
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-eye">
            {show ? (
              <HiEye size={20} onClick={handleClick} />
            ) : (
              <HiOutlineEyeOff size={20} onClick={handleClick} />
            )}
          </div>
        </div>

        <button onClick={() => logar()}>Entrar</button>

        <h4>Não tem cadastro?</h4>

        <button onClick={() => {linkCadastro();}}>Cadastrar-se</button>
      </div>
    </div>
  );
}
export default Login;
