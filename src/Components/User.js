import React, { useEffect, useState } from 'react'

import axios from 'axios'


const User = () => {
    const [preguntas, setPreguntas] = useState([]); 

    useEffect(() => {
       
        const obtenerPreguntas = async () =>{
      
            const res = await axios.get('http://localhost:8080/obtenerPreguntas');
            console.log(res);
        }

        obtenerPreguntas();



    }, []) 

    return (
        <div>
            <h2>Preguntas</h2>
            {preguntas.length = 0? <p>No hay preugntas</p>: preguntas.map((e) => <p key={e.id_pregunta}>{e.pregunta}</p>) }

        </div>
    )
}

export default User
