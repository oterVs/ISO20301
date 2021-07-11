import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { unstable_Box as Box } from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "../../../src/App.css";
import TextField from "@material-ui/core/TextField"
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

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
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Question = () => {
  const [formQuestion, setFormQuestion] = useState(initialQuestion);
  const { classes } = styles;
  const clas = useStyles();

  const handleChange = (e) => {
    setFormQuestion({ ...formQuestion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `http://localhost:8080/seguridad/agregarPregunta/1/${formQuestion.pregunta}`
    )

    

    if(res.ok){
      <Alert severity="success">Pregunta guardada con exito!</Alert>
      setFormQuestion(initialQuestion);
    }else {
      <Alert severity="error">La pregunta no se guardo correctamente!</Alert>
    }

    
  };
  return (
    <div>
      <Grid Container spacing={3}>
        <Grid item xs={12}  >
          <h2 style={{ textAlign: "center", marginBottom:"20px" }}>
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
              }}></TextField>
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
              <Button onClick={handleSubmit}
                style={{ background: "#2193b0", color: "#fff", marginRight:"50px" }}
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
      </Grid>
    </div>
  );
};

export default Question;
