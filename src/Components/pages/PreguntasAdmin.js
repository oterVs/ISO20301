
import React, { useEffect, useState } from "react";

import axios from "axios";
import PreguntaUsuario from "./PreguntaUsuario";
import { Button, Grid } from "@material-ui/core";
import Escala from "./Escala";
import Cookies from "universal-cookie";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
const cookies = new Cookies();
const PreguntasAdmin = () => {
    const [preguntas, setPreguntas] = useState([]);
    const [cowocer, setCowoker] = useState([]);
    const [open, setOpen] = React.useState(false);
  
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setOpen(false);
    };
    useEffect(() => {
      const obtenerPreguntas = async () => {
        let usuario = cookies.get("usuario");
        console.log(usuario);
        const res = await axios.get(
          `https://sgcn-app.herokuapp.com/seguridad/preguntasCoworker/${usuario}`
        );
        setPreguntas(res.data);
        console.log(res);
      };
  
      obtenerPreguntas();
   
    }, []);
    const enviar = async () => {
        respuestas();
        let usuario = cookies.get("usuario");
        console.log(cowocer);
        const res = await axios.post(
          `https://sgcn-app.herokuapp.com/seguridad/actualizarPreguntas/${usuario}`,
          cowocer
        );
    
        console.log(res);
        setOpen(true);
        setCowoker([]);
      };
    
    const respuestas = () => {
        preguntas.forEach((el) => {
          let v = {
            idCoworkerPregunta: el.idCoworkerPregunta,
            calificacion: el.calificacion,
            pregunta: {
              idPregunta: el.pregunta.idPregunta,
            },
          };
          cowocer.push(v);
        });
      };
    
      const handleAnswer = (id, calif) => {
        console.log(id, calif);
    
        preguntas.forEach((el) => {
          if (id === el.idCoworkerPregunta) {
            el.calificacion = parseInt(calif, 10);
          }
        });
        setPreguntas(preguntas);
        // let newData = preguntas.map(el => el.idCoworkerPregunta === id? el.calificacion = calif:el);
        // setPreguntas(newData);
      };
    return (
        <div>
             <Grid container style={{ padding: "1cm" }}>
        <Grid item xs={12}>
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            Por favor responda las siquientes preguntas
          </h3>
        </Grid>
        <Grid container xs={3}>
          <Grid item xs={8}>
            <h5>Escala</h5>
            <p>Desconozco</p>
            <p>Totalmente en Desacuerdo</p>
            <p>Desacuerdo</p>
            <p>De acuerdo</p>
            <p>Totalmente de Acuerdo</p>
          </Grid>
          
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <h5>Puntaje</h5>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
          </Grid>

          {/* <Escala></Escala> */}
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={8}>
          {preguntas.map((el) => (
            <PreguntaUsuario
              id={el.idCoworkerPregunta}
              calif={el.calificacion}
              handleAnswer={handleAnswer}
              key={el.pregunta.idPregunta}
              Pregunta={el.pregunta.pregunta}
            ></PreguntaUsuario>
          ))}
        </Grid>
        <Grid item xs={11}></Grid>
        <Grid item xs={1}>
          <Button
            onClick={enviar}
            style={{
              background: "#2193b0",
              color: "#fff",
              marginRight: "50px",
            }}
            variant="contained"
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Formulario enviado!
        </Alert>
      </Snackbar>
        </div>
    )
}

export default PreguntasAdmin
