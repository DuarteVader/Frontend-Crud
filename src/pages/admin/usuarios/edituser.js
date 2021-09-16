import React,{useState,useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuAdmin from '../../../components/menu-admin';


import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../../services/api';

import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {display: 'flex',},
  title: {flexGrow: 1,},
  appBarSpacer: theme.mixins.toolbar,
  content: {flexGrow: 1,height: '100vh',overflow: 'auto',},
  container: {paddingTop: theme.spacing(2),paddingBottom: theme.spacing(4),},
  paper: {padding: 35,display: 'flex',overflow: 'auto',flexDirection: 'column',},
  formControl:{width:'100%'},
  btnSuccess:{ backgroundColor:"green",color:"#fff","&:hover":{backgroundColor:"#12b912"}}
}));

export default function EditarUser() {
  const classes = useStyles();
  var idUser = localStorage.getItem("userEdit")
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [level, setLevel] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    async function getUsuario(){
      const id = localStorage.getItem("id")
      console.log(localStorage.getItem("user"))
      var response = await api.get('/projects/'+id);
      
      setName(response.data.user.name);
      setCpf(response.data.user.cpf);
      setEmail(response.data.user.email);
      setLevel(response.data.user.level);
      setId(response.data.user._id)
    }
    getUsuario();
  },[])

  async function handleSubmit(){
 
    const usuario = {
      name:name,
      email:email,
      cpf:cpf,
      level:level,
      _id:id
    }
      if(name!==''&&email!==''&&level!==''&&cpf!==''){
        console.log("chegou")
        const response = await api.put('/projects/update/'+id,usuario);

        if(response.status===200){
          window.location.href='/usuarios'
        }else{
          alert('Erro ao atualizar o usuário!');
        }
      }else{
        alert('Por favor, preencha todos os dados!');
      }

     

  }
  
  return (
    <div className={classes.root}>
      
      <MenuAdmin title={'USUÁRIOS'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
            <Button style={{marginBottom:10,marginRight:5}} variant="contained" href={'/usuarios'}><ArrowBackIcon /> Voltar</Button>
              <Paper className={classes.paper}>
                <h2>Atualização de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome completo"
                      fullWidth
                      autoComplete="nome"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="cpf"
                      name="cpf"
                      label="CPF"
                      fullWidth
                      autoComplete="cpf"
                      value={cpf}
                      onChange={e => setCpf(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="level"
                      required
                      id="level"
                      name="level"
                      label="Nivel Acesso"
                      
                      autoComplete="Nivel Acesso"
                      value={level}
                      onChange={e => setLevel(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Button variant="contained"  onClick={handleSubmit} className={classes.btnSuccess}>
                    <SaveIcon /> Salvar
                  </Button>
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