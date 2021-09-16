import React, { useState, useEffect } from 'react';
import './cadastroUser.css';
import api from '../../services/api';

import { MdEmail, MdHttps } from 'react-icons/md';
import { HiEye, HiOutlineEyeOff } from 'react-icons/hi';
import { RiAccountPinCircleFill } from "react-icons/ri";
import { AiOutlineFieldNumber } from "react-icons/ai";

import { useHistory } from 'react-router-dom';



function Cadastro() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const [level, setLevel] = useState(1);

  function linkLogar() {
    history.push('/');
  }

  useEffect(() => {
    (async () => {
      const token = await localStorage?.getItem?.('token');
      const user = JSON?.parse?.(await localStorage?.getItem?.('user'));
    })();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  async function cadastrar() {
    try {
      const response = await api.post('/auth/cadastro', {
        name,
        email,
        cpf,
        password,
        level
      });
      const { user, token } = response.data;
      await localStorage.setItem('token', token);
      await localStorage.setItem('user', JSON.stringify(user));
      
      if(response.status ===200){
        window.location.href = '/';
      }else{
        alert('Ocorreu um erro. Por favor, tente novamente!');
      }
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
          <div className="login-InputEmail">
            <RiAccountPinCircleFill />
            <input
              type="usuario"
              placeholder="Digite o Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="login-InputEmail">
            <MdEmail />

            <input
              type="usuario"
              placeholder="Digite um Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-InputEmail">
            <AiOutlineFieldNumber />

            <input
              type="usuario"
              placeholder="Digite um CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
        <div className="login-InputEmail">
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
        <button onClick={() => cadastrar()}>Cadastrar</button>
        <button onClick={() => {linkLogar();}}>Logar</button>
      </div>
    </div>
  );
}
export default Cadastro;
