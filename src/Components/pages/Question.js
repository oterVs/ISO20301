import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const initialQuestion = {
  id_pregunta: "",
  id_formulario: "1",
  pregunta: "",
};

const Question = () => {
  const [formQuestion, setFormQuestion] = useState(initialQuestion);

  const handleChange = (e) => {
    setFormQuestion({ ...formQuestion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `http://localhost:8080/seguridad/agregarPregunta/1/${formQuestion.pregunta}`
    );

    setFormQuestion(initialQuestion);
  };
  return (
    <div>
      <Grid Container spacing={24}>
        <Grid item xs={12}>
          <h2 style={{textAlign:"center"}}>Agregar una nueva pregunta al GAP Análisis</h2>
        </Grid>
        <Grid item xs={12} sm={6}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={formQuestion.pregunta}
              name="pregunta"
              onChange={handleChange}
            ></input>
            <input type="submit"></input>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Question;
