import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Dashboard from './pages/admin/dashboard/dashboard';
import DashboardUser from './pages/admin/dashboard/dashboardUser';
import Cadastrar from './pages/Cadastrar/cadastroUser.js'
import Login from './pages/Login/index';
import UsuariosListagem from './pages/admin/usuarios/usuarios';
import EditarAdmin from './pages/admin/usuarios/editUsuarios';
import EditarUser from './pages/admin/usuarios/edituser';

export default function Routes(){
      
  return (
    <BrowserRouter>
        <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/cadastrar" component={Cadastrar} />
        <Route path="/homeadm" component={Dashboard} />
        <Route path="/homeuser" component={DashboardUser} />
        <Route path="/usuarios" component={UsuariosListagem} />
        <Route path="/editar/usuarios" component={EditarAdmin} />
        <Route path="/editar" component={EditarUser} />



        </Switch>
      </BrowserRouter>
  )
  };
