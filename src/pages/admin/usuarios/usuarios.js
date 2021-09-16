import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

import MenuAdmin from '../../../components/menu-admin';
import api from '../../../services/api';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  buttons: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    paddingtop: theme.spacing(10),
  },
  // fixedHeight: {
  //   height: 300,
  // },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 25,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function UsuariosListagem() {
  const classes = useStyles();
  const history = useHistory();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function loadUsuarios() {
      const response = await api.get('/projects/usuarios');
      setUsuarios(response.data.usuarios);
    }
    loadUsuarios();
  }, []);

  function puxarId(id){
    localStorage.setItem("userEdit", id)
    history.push('/editar/usuarios/'+id)


  }
  
  async function handleDelete(id){
    if(window.confirm("Deseja realmente excluir este usuário?")){
      var result = await api.delete('/projects/'+id)
      if(result.status ===200){
        window.location.href = '/usuarios';
      }else{
        alert('Ocorreu um erro. Por favor, tente novamente!');
      }
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'Usuarios'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2> Listagem de Usuários </h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table className={classes.appBarSpacer}>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center">Nome</StyledTableCell>
                            <StyledTableCell align="center">
                              Email
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Cpf
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Level
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Ações
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {usuarios.map((row) => (
                            <TableRow key={row._id}>
                              <TableCell component="th" scope="row" align="center">
                                {row.name}
                              </TableCell>
                              <TableCell align="center">{row.email}</TableCell>
                              <TableCell align="center">{row.cpf}</TableCell>
                              <TableCell align="center">{row.level ===1?<Chip
                                                                    label="Usuário"
                                                                    color="primary"
                                                                  />:<Chip
                                                                  label="Administrador"
                                                                  color="secondary"
                                                                />}</TableCell>
                              <TableCell align="center">
                                <div className={classes.buttons}>
                                <Button variant="outlined" color="primary" onClick={() => {puxarId(row._id);}}>
                                  Alterar
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={() => handleDelete(row._id)}>
                                  Deletar
                                </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
