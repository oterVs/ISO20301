import { Radar, Chart } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Grid from "@material-ui/core/Grid";

const cookies = new Cookies();

const data = {
  labels: ["Seleccione una Universidad"],
  datasets: [
    {
      label: "Calificacion",
      data: [0],
      backgroundColor: "rgba(33, 147, 176, 0.1)",
      borderColor: "rgba(33, 147, 176, 1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  scale: {
    ticks: { beginAtZero: true },
  },
};

const GraficoUnico = () => {
  const [universidad, setUniversidad] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const [dat, setDat] = useState(data);

  useEffect(() => {
    obtenerUniversidad();
    
  }, []);

  const graficar = async (un) => {
      console.log("entro");
      let newData = data;
   
     
      await axios.get(
          `https://sgcn-app.herokuapp.com/seguridad/soloPromedioPreguntas/GAP ANÁLISIS/${un}`
        ).then((res) => {
          return res.data
        }).then((res)=>{
          preguntas.forEach((el)=>{
            newData.labels[el.idPregunta -1 ] = `Pregunta: ${el.idPregunta}`;
            newData.datasets[0].data[el.idPregunta -1] = res[`promedio ${el.idPregunta}`];
          
          })
        }).catch((e)=>{
          console.log(e);
          alert("No se pudieron recuperar los datos correctamente ");
        })
        console.log(newData)
        setDat(newData);
    
        let ctx = document.getElementById("myChart").getContext("2d");

       if(window.grafica){
          window.grafica.clear();
          window.grafica.destroy();
       }

       window.grafica = new Chart(ctx, {type:"radar", data: newData, options: options })
  };

  const obtenerUniversidad = async () => {
    let usuario = cookies.get("usuario");
    console.log(usuario);
    const res = await axios.get(
      `https://sgcn-app.herokuapp.com/seguridad/obtenerUCoworker/${usuario}`
    );
    setUniversidad(res.data.universidad);
    const resP = await axios.get(
      "https://sgcn-app.herokuapp.com/seguridad/obtenerPreguntas"
    );
    setPreguntas(resP.data);
    graficar(res.data.universidad);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Grafico del GAP Análisis
          </h2>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: "50px" }}>
          <h3 style={{ marginBottom: "20px" }}>
             {universidad}
          </h3>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={5}>
            {preguntas.map((el) => (
              <p key={el.idPregunta}>
                {el.idPregunta} {el.pregunta}
              </p>
            ))}
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={6}>
            {/* <Radar id="grafico" ref={ref}  data={dat} options={options} /> */}
            <canvas id="myChart" width="100%"></canvas>
          </Grid>
        </Grid>
      </Grid>
   
    </div>
  );
};

export default GraficoUnico;
