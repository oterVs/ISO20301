import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import axios from "axios";
import { unstable_Box as Box } from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "../../../src/App.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const initialQuestion = {
  id_pregunta: "",
  id_formulario: "1",
  pregunta: "",
};

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: "none",
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Question = () => {
  const [formQuestion, setFormQuestion] = useState(initialQuestion);
  const { classes } = styles;
  const clas = useStyles();

  const [open, setOpen] = React.useState(false);
  const [typeAlert, setTypeAlert] = React.useState("");
  const [messageAlert, setMesaggeAlert] = React.useState("");
  const [openD, setOpenD] = React.useState(false);

  const handleClickOpen = () => {
    setOpenD(true);
  };
  const handleCloseD = () => {
    setOpenD(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const reiniciar = async () => {

    await axios.delete("https://sgcn-app.herokuapp.com/seguridad/resetearTodo").then((response) => {
      setOpen(true);
      setMesaggeAlert("Reinicio realizado con exito");
      setTypeAlert("success");
      setOpenD(false);
    }).catch((e) => {
      setOpen(true);
      setMesaggeAlert("No se pudo completar el reinicio");
      setTypeAlert("error");
      setOpenD(false);
    });
   
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);

  };
  const handleChange = (e) => {
    setFormQuestion({ ...formQuestion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formQuestion.pregunta){
      const res = await axios.get(
        `https://sgcn-app.herokuapp.com/seguridad/agregarPregunta/1/${formQuestion.pregunta}`
      ).then((response) => {
        setOpen(true);
        setMesaggeAlert("Nota guardada exitosamente");
        setTypeAlert("success");
        setFormQuestion(initialQuestion);
      }).catch((e) => {
        setOpen(true);
        setMesaggeAlert("Error al cargar la nota, vuelva a intentarlo ");
        setTypeAlert("error");
      });
      
    } else{
      setOpen(true);
      setMesaggeAlert("Rellene todos los datos");
      setTypeAlert("info");
    }

  };
  return (
    <div>
      <Grid Container spacing={3}>
        <Grid item xs={12}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Agregar una nueva pregunta al GAP Análisis
          </h2>
        </Grid>

        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid item xs={8}>
              <TextField
                id="standard-full-width"
                label="Pregunta Gap Análisis"
                style={{ margin: 8 }}
                placeholder="Plan de Continuidad del Negocio"
                name="pregunta"
                onChange={handleChange}
                value={formQuestion.pregunta}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              ></TextField>
              {/* <form onSubmit={handleSubmit}>

                <input
                  type="text"
                  value={formQuestion.pregunta}
                  name="pregunta"
                  onChange={handleChange}
                ></input>
                <input type="submit"></input>
              </form> */}
            </Grid>
            <Grid item xs={3}>
              <Button
                onClick={handleSubmit}
                style={{
                  background: "#2193b0",
                  color: "#fff",
                  marginRight: "50px",
                }}
                variant="contained"
              >
                Agregar
              </Button>
              <Button
                style={{ background: "#2193b0", color: "#fff" }}
                variant="contained"
              >
                Limpiar
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}></Grid>
        <hr style={{ marginTop: "250px" }}></hr>
        <Grid item xs={12}>
          <h4 style={{ marginBottom: "20px" }}>
            Reiniciar Sistema 
          </h4>
          <Button onClick={handleClickOpen}
                style={{ background: "#2193b0", color: "#fff" }}
                variant="contained"
          >Reseteo Sistema</Button>
          <Dialog
        open={openD}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Esta seguro que desea reiniciar el sistema?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Se eliminaran todas las preguntas, y los usuarios que no sean administradores.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseD} color="primary">
            No
          </Button>
          <Button onClick={reiniciar} color="primary" autoFocus>
            Si
          </Button>
        </DialogActions>
      </Dialog>
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

export default Question;
