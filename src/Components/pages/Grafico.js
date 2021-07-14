import { Radar, Chart } from "react-chartjs-2";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";



const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
  { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  { title: "The Lord of the Rings: The Two Towers", year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  { title: "Star Wars: Episode VI - Return of the Jedi", year: 1983 },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  { title: "Eternal Sunshine of the Spotless Mind", year: 2004 },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const data = {
  labels: ["Thing 1", "Thing 2", "Thing 3", "Thing 4", "Thing 5", "Thing 6"],
  datasets: [
    {
      label: "Calificacion",
      data: [4, 4, 2, 3.4, 1, 2],
      backgroundColor: "rgba(255, 99, 132, 0.1)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

// const datasets = [
//   {
//     label: "Calificacion",
//     data: [],
//     backgroundColor: "rgba(255, 99, 132, 0.1)",
//     borderColor: "rgba(255, 99, 132, 1)",
//     borderWidth: 1,
//   },
// ]

const options = {
  scale: {
    ticks: { beginAtZero: true },
  },
};

const Grafico = () => {
  const classes = useStyles();
  const [universidad, setUniversidad] = useState(null);
  const [uni, setUni] = useState("Universidad Central Del Ecuador");
  const [preguntas, setPreguntas] = useState([]);
  const [notas, setNotas] = useState([]);
  const ref = useRef();
 
  // const [labels, setLabels] = useState([]);
  // const [dataset, setDataset] = useState(datasets);
  const [dat, setDat] = useState(data)

  useEffect(() => {
    obtenerUniversidades();
    obtenerPreguntas();
    let ctx = document.getElementById("myChart").getContext("2d");
    window.grafica = new Chart(ctx, {type:"radar", data: dat, options: options })

  }, []);

  useEffect(() => {
    obtenerNotas();
    
  }, [uni]);

  // useEffect(() => {
  //   let ctx = document.getElementById("grafico").getContext("2d");

  // }, [data]);
  const obtenerPreguntas = async () => {
    const res = await axios.get(
      "https://sgcn-app.herokuapp.com/seguridad/preguntasCoworker/corbe"
    );
    setPreguntas(res.data);
  

    

  };

  const colocarLabel = () => {
     let newData = data;

    preguntas.forEach((el) => {
      
      newData.labels[el.pregunta.idPregunta -1 ] = `Pregunta: ${el.pregunta.idPregunta}`;
      console.log( dat.labels[el.pregunta.idPregunta -1 ]);
      newData.datasets[0].data[el.pregunta.idPregunta -1] = 0;
      // newData.push(`Pregunta: ${el.pregunta.idPregunta}`);
    
    })

    console.log(newData);
    setDat(newData);
    
    let ctx = document.getElementById("myChart").getContext("2d");
  
  
 
       if(window.grafica){
          window.grafica.clear();
          window.grafica.destroy();
       }

       window.grafica = new Chart(ctx, {type:"radar", data: dat, options: options })
  
      
      //   window.myCharts = new Chart(ctx, {type: "radar", data: data, options: options})
      // newChart.destroy();
      // newChart = new Chart(ctx, { data: data, options: options});
  }
  const obtenerUniversidades = async () => {
    const res = await axios.get(
      "https://sgcn-app.herokuapp.com/seguridad/obtenerUniversidades"
    );
    // console.log(res);
    // console.log(res.data[0].univesidades);
    setUniversidad(res.data);
    console.log(universidad);
  };

  const obtenerNotas = async () => {
    let newData = data;
 
    console.log("entro");
    // await axios.get(
    //   `http://localhost:8080/seguridad/promedioPreguntas/GAP ANÁLISIS/${uni}`
    // ).then((response) =>{
    //     return response.data
    // }).then((response) => {
    //   response.forEach(element => {
    //     newData.push(element.nota);
    //     labels.push()
    //   });
    //   console.log(response);
    // });
    await axios.get(
        `https://sgcn-app.herokuapp.com/seguridad/soloPromedioPreguntas/GAP ANÁLISIS/${uni}`
      ).then((res) => {
        return res.data
      }).then((res)=>{
        preguntas.forEach((el)=>{
          newData.labels[el.pregunta.idPregunta -1 ] = `Pregunta: ${el.pregunta.idPregunta}`;
          newData.datasets[0].data[el.pregunta.idPregunta -1] = res[`promedio ${el.pregunta.idPregunta}`];
        
        })
      })
      setDat(newData);
      let ctx = document.getElementById("myChart").getContext("2d");
  

       if(window.grafica){
          window.grafica.clear();
          window.grafica.destroy();
       }
       window.grafica = new Chart(ctx, {type:"radar", data: dat, options: options })
    
   
      

  }
  
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Grafico del GAP Análisis
          </h2>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: "50px" }}>
          <Autocomplete

           
            onChange={(event, newValue) => {
              if(newValue){
                setUni(newValue.nombreUniversidad);
              }
          
            }}

           
            
            id="combo-box-demo"
            options={universidad}
            getOptionLabel={(option) => option.nombreUniversidad}
            style={{ width: 300, margin: "0.5cm" }}
            renderInput={(params) => (
              <TextField {...params}  label="Universdad" variant="outlined" />
            )}
          />
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={5}>
            {preguntas.map((el) => (
              <p key={el.pregunta.idPregunta}>
                {el.pregunta.idPregunta} {el.pregunta.pregunta}
              </p>
            ))}
          </Grid>
          <Grid item xs={1}>
           
          </Grid>
          <Grid item xs={6}>
            {/* <Radar id="grafico" ref={ref}  data={dat} options={options} /> */}
            <canvas id="myChart" width="100%"></canvas>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Grafico;
