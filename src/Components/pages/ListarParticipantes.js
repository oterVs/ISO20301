import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Cookies from "universal-cookie";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Tables from "./Tables"
import CircularProgress from '@material-ui/core/CircularProgress'
const cookies = new Cookies();
const columns = [
  { id: "name", label: "Nombre", minWidth: 170 },
  { id: "code", label: "Apellidos", minWidth: 170 },
  {
    id: "population",
    label: "Rol",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Usuario",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Contraseña",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];
function createData(name, code, population, size, density) {
 
  return { name, code, population, size, density };
}
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const rows = [
  createData("India", "IN", 1324171354, 3287263),

];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const ListarParticipantes = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [activoCombo, setActivoCombo] = useState(false);
  const [univ, setUniv] = useState("Universidad Técnica del Norte");
  const [universidades, setUniversidades] = useState(null);
  const [participantes, setParticipantes] = useState([]);
  const [data, setData] = useState([]);  
  const [render, setRender] = useState(false);
   useEffect(() => {
        initialCombo();
        obtenerParticipantes();

   }, []);
   useEffect(() => {
    
    obtenerParticipantes();

}, [univ]);


   const initialCombo = async () => {

    if (cookies.get("tipo") === "1") {
        setActivoCombo(false); 
        const res = await axios.get(
            "https://sgcn-app.herokuapp.com/seguridad/obtenerUniversidades"
        );
         console.log(res); 
        setUniversidades(res.data);
        console.log(res.data[0].nombreUniversidad);
        setUniv(res.data[0].nombreUniversidad)
        
      } else {
        setActivoCombo(true);
        let usuario = cookies.get("usuario");
        console.log(usuario);
        const res = await axios.get(
        `https://sgcn-app.herokuapp.com/seguridad/obtenerUCoworker/${usuario}`
        );
        setUniv(res.data.universidad);

      }
   }

   const obtenerParticipantes = async () => {
    setRender(true);
    console.log(univ);
    const res = await axios.get(
        `https://sgcn-app.herokuapp.com/seguridad/obtenerUsuarioPorUniversidad/${univ}`
    ).then((response) => {
        return response.data;
    }).then((response)=>{
        if(response){
          console.log(response)
          setParticipantes(response);
          setRender(false);
        } else {
          setParticipantes([])
          setRender(false);
        }
       
    });
    

    // participantes.forEach((el) => {
        
    //     console.log(el.apellidos);
    //     let data = createData(el.nombres, el.apellidos, el.rol.idRol, el.nombreUsuario, el.password);
    //     newData.push(data);
    // })
    // console.log(newData);
    // setData(newData);

   }

   const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      {!activoCombo?<h2>Participantes por universiad</h2>:<h2>Participantes de la {univ}</h2>}
      <Grid container>
        <Grid item xs={5}>

        <Autocomplete
            
            onChange={(event, newValue) => {
              if (newValue) {
               
                setUniv(newValue.nombreUniversidad );
                
              }
            }}
            id="combo-box-demo"
            disabled={activoCombo}
            
            
            options={universidades}
            getOptionLabel={(option) => option.nombreUniversidad}
            style={{ width: "100%", margin: "0.5cm" }}
            renderInput={(params) => (
              <TextField {...params} label="Universdad" variant="outlined" />
            )}
          />


         
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid  item xs={2}>
        {render &&  <CircularProgress color="secondary" />}

        </Grid>
        <Grid item xs={12}>
          <Tables data={participantes}></Tables>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Usuario incorrecto!
          </Alert>
     </Snackbar>
    </div>
  );
};

export default ListarParticipantes;
