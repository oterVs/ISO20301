import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import usuarios from "../../images/usuarios.svg";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const maill = {
  mailInstitucional: "",
};

const datosUsuario = {
  nombreUsuario: "",
  password: "",
  nombres: "",
  apellidos: "",
  rol: {
    idRol: "2",
  },
};


const initialForm = {
  mailInstitucional: "",
  datosUsuario,
 
};

const CrearParticipante = () => {
  const [formUsuario, setFormUsuario] = useState(initialForm);
  const [mailInstitucional, setMainInstitucional] = useState("");
  const [usuario, setUsuario] = useState(datosUsuario);
  const [universidad, setUniv] = useState("");
  const [nombreU, setNombreU] = useState("")

  const [open, setOpen] = React.useState(true);
  const [open2, setOpen2] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpen2(false);
  };

  useEffect(() => {

    obtenerUniversidad();
  }, []);

 

  const obtenerUniversidad = async () => {
    let usuario = cookies.get("usuario");
    console.log(usuario);
    const res = await axios.get(
      `https://sgcn-app.herokuapp.com/seguridad/obtenerUCoworker/${usuario}`
    );

    setUniv(res.data.idUniversidad);
    setNombreU(res.data.universidad);
    console.log(res.data);
  };

  const enviarNuevoUsuario = () => {
    setUsuario(datosUsuario);
  
    setMainInstitucional("");
    setFormUsuario(initialForm);
    setOpen2(true);
  };

  const handleSubmit = async () => {
    if (!usuario.nombreUsuario || !usuario.password) {
      setOpen(true);
    } else {
      console.log("entros2");
      setFormUsuario({
        mailInstitucional: mailInstitucional,
        usuario,
        universidad,
      });
      const res = await axios.post(
        "https://sgcn-app.herokuapp.com/seguridad/crearCoworker",
        { mailInstitucional: mailInstitucional, usuario, universidad: {idUniversidad: universidad} }
      );

      enviarNuevoUsuario();
    }
  };

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Creacion Participante
      </h2>
      <Grid container spasing={8}>
        <Grid item xs={6}>
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
          <TextField
            style={{ margin: "0.5cm" }}
            id="standard-basic"
            onChange={handleChange}
            name="nombreUsuario"
            value={usuario.nombreUsuario}
            label="Nombre de Usuario"
            fullWidth
          />
          <TextField
            style={{ margin: "0.5cm" }}
            id="standard-basic"
            onChange={(e) => {
              setMainInstitucional(e.target.value);
            }}
            name="mailInstitucional"
            value={mailInstitucional}
            label="Mail institucional"
            fullWidth
          />
          <TextField
            style={{ margin: "0.5cm" }}
            id="standard-basic"
            onChange={handleChange}
            name="password"
            value={usuario.password}
            label="Password"
            type="password"
            fullWidth
          />
          <Autocomplete
          inputValue={nombreU}
          id="disabled"
          disabled
          renderInput={(params) => <TextField {...params} label="Universidad" margin="normal" />}
      />
        </Grid>
        <Grid item xs={6}>
          <img
            style={{ width: "100%", textAlign: "center" }}
            alt=""
            src={usuarios}
          ></img>
        </Grid>
        <Grid item xs={12}>
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
         
            Guardar Usuario
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          Tiene que rellenar todos los datos!
        </Alert>
      </Snackbar>
      ;
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success">Particpante guardado con exito</Alert>
      </Snackbar>
      ;
    </div>
  );
};

export default CrearParticipante;
