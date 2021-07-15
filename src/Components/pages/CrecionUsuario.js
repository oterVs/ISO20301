import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import usuarios from "../../images/usuarios.svg"



const datosUsuario = {
 

 
  nombres: "",
  apellidos: "",
  rol: {
    idRol: "3",
  },
};

const uniSelec = {
  idUniversidad: "",
};
const initialForm = {
 
  datosUsuario,
  uniSelec,
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const CrecionUsuario = () => {
  const [formUsuario, setFormUsuario] = useState(initialForm);
  const [mailInstitucional, setMainInstitucional] = useState("");
  const [usuario, setUsuario] = useState(datosUsuario);
  const [universidad, setUniv] = useState(uniSelec);
  const [universidades, setUniversidad] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [typeAlert, setTypeAlert] = React.useState("");
  const [messageAlert, setMesaggeAlert] = React.useState("");


  


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);

  };

  useEffect(() => {
    obtenerUniversidades();
  }, []);

  const obtenerUniversidades = async () => {
    const res = await axios.get(
      "https://sgcn-app.herokuapp.com/seguridad/obtenerUniversidades"
    );
    console.log(res);
    console.log(res.data[0].univesidades);
    setUniversidad(res.data);
    console.log(universidades);
  };

  const enviarNuevoUsuario = async () => {
    
   
    setUsuario(datosUsuario);
    setUniv(uniSelec);
   
    setFormUsuario(initialForm);
 
  };

  const handleSubmit = async () => {
    
    if (
      !usuario.nombres || !usuario.apellidos
      
    ) {
      setOpen(true);
      setMesaggeAlert("Por favor rellene todos los campos");
      setTypeAlert("info");
      
    } else {
      console.log("entros2");
      
      const res = await axios.post(
        
        "https://sgcn-app.herokuapp.com/seguridad/crearCoworker",
        { usuario, universidad}
      ).then(()=>{
        setOpen(true);
        setMesaggeAlert("Usuario guardado exitosamente");
        setTypeAlert("success");
      }).catch((e)=>{
        setOpen(true);
        setMesaggeAlert("No se pudo almacenar al usuario intente de nuevo");
        setTypeAlert("error");
      });
     
      
      enviarNuevoUsuario();
    }
  };

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
    
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Creacion de Usuario Admin
      </h2>
      <Grid container spasing={8}>
        <Grid item xs={5}>
          <TextField
            style={{ margin: "0.5cm" }}
            id="standard-basic"
            onChange={handleChange}
            name="nombres"
            value={usuario.nombres}
            label="Nombres"
            fullWidth
          />
          <TextField
            style={{ margin: "0.5cm" }}
            id="standard-basic"
            onChange={handleChange}
            name="apellidos"
            value={usuario.apellidos}
            label="Apellidos"
            fullWidth
          />
          
         
          <Autocomplete
            
            onChange={(event, newValue) => {
              
              if(newValue){
                setUniv({ idUniversidad: newValue.idUniversidad });
              }
            }}
            id="combo-box-demo"
            // onClick={(option) => formUsuario.universiad = option.idUniversidad}
            options={universidades}
            getOptionLabel={(option) => option.nombreUniversidad}
            style={{ width: "100%", margin: "0.5cm" }}
            renderInput={(params) => (
              <TextField {...params} label="Universdad" variant="outlined" />
            )}
          />
          <Button
            onClick={handleSubmit}
            style={{
              background: "#2193b0",
              color: "#fff",
              marginRight: "50px",
              margin: "0.5cm",
            }}
            variant="contained"
          >
           
            Guardar Usuario{" "}
          </Button>
        </Grid>
        <Grid item xs={1}>
          
        </Grid>
        <Grid item xs={6}>
          <img style={{width:"100%", textAlign:"center"}} alt="" src="https://mailtumble.com/wp-content/uploads/2020/10/undraw_project_team_lc5a2.png"></img>
        </Grid>
        
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={typeAlert}>
          {messageAlert}
        </Alert>
      </Snackbar>;
 
    </div>
  );
};

export default CrecionUsuario;
