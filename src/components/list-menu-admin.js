import React from 'react';
import '../pages/admin/dashboard/dashboard.css';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';


export const mainListItems = (
  <div>
    <ListItem button component="a" href="/homeadm">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard"  />
    </ListItem>
    <ListItem button component="a" href="/usuarios">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuarios" />
    </ListItem>
    <ListItem button component="a" href="/editar">
      <ListItemIcon>
        <AccountCircle />
      </ListItemIcon>
      <ListItemText primary="Perfil" />
    </ListItem>
  </div>
);

export const mainListItemsUser = (
  <div>
    <ListItem button component="a" href="/homeuser" >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component="a" href="/editar" >
      <ListItemIcon>
        <AccountCircle />
      </ListItemIcon>
      <ListItemText primary="Perfil" />
    </ListItem>
  </div>
);

function confirmSair() {
  if(window.confirm("Deseja realmente sair do sistema?")){
    localStorage.clear();
    window.location.href ='/';
  }else{
    alert("Não foi possivel fazer logout!")
  }

}
export const secondaryListItems = (
  <div>
    <ListSubheader inset>Configurações</ListSubheader>
    <ListItem button onClick={() => confirmSair()}>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
);