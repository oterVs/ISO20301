import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import usuarios from "../../images/usuarios.svg";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const datosUsuario = {
  nombres: "",
  apellidos: "",
  rol: {
    idRol: "2",
  },
};

const initialForm = {
  datosUsuario,
};
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const CrearParticipante = () => {
  const [formUsuario, setFormUsuario] = useState(initialForm);
  const [mailInstitucional, setMainInstitucional] = useState("");
  const [usuario, setUsuario] = useState(datosUsuario);
  const [universidad, setUniv] = useState("");
  const [nombreU, setNombreU] = useState("");

  const [open, setOpen] = React.useState(true);
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
  };

  const handleSubmit = async () => {
    if (!usuario.nombres || !usuario.apellidos) {
      setOpen(true);
      setMesaggeAlert("Por favor rellene todos los campos");
      setTypeAlert("info");
    } else {
      setFormUsuario({
        mailInstitucional: mailInstitucional,
        usuario,
        universidad,
      });
      const res = await axios
        .post("https://sgcn-app.herokuapp.com/seguridad/crearCoworker", {
          usuario,
          universidad,
        })
        .then(() => {
          setOpen(true);
          setMesaggeAlert("Usuario guardado exitosamente");
          setTypeAlert("success");
        })
        .catch((e) => {
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
        Creacion Participante
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
            inputValue={nombreU}
            id="disabled"
            disabled
            renderInput={(params) => (
              <TextField {...params} label="Universidad" margin="normal" />
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
            Guardar Usuario
          </Button>
        </Grid>
        <Grid item xs={1}> </Grid>
        <Grid item xs={6}>
          <img
            style={{ width: "100%", textAlign: "center" }}
            alt=""
            src="https://mailtumble.com/wp-content/uploads/2020/10/undraw_project_team_lc5a2.png"
          ></img>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={typeAlert}>
          {messageAlert}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CrearParticipante;
