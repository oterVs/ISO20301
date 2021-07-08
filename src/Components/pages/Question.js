

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from 'axios'

const initialQuestion = {
    id_pregunta: "",
    id_formulario: "1",
    pregunta: ""

}



const Question = () => {
    const [formQuestion, setFormQuestion] = useState(initialQuestion); 


    const handleChange = (e) =>{
        setFormQuestion({...formQuestion,
            [e.target.name]: e.target.value})
    }
    
    
    
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const res = await axios.get(`http://localhost:8080/seguridad/agregarPregunta/1/${formQuestion.pregunta}`);
        
        setFormQuestion(initialQuestion);
    }
    return (
        <div>
            <h2>Agregar una nueva pregunta al GAP Análisis</h2>

            <form onSubmit={handleSubmit}>
                <input type="text" value={formQuestion.pregunta} name="pregunta" onChange={handleChange} ></input>
                <input type="submit"></input>

            </form>


        </div>
    )
}

export default Question;
