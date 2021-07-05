import React from 'react'
import {useParams} from 'react-router-dom'


const initial = {
    uno: 'Determinar el Próposito y alcance de tu PCN y selecciona al líder y equipo responsable de llevarlo a cabo'
    ,
    dos: 'Determinar las Actividades Prioritarias de tu empresa y losTiempos de Recuperación Ideales'
    ,
    tres: 'Determinar qué necesitas para la continuidad de tus Negocios'
}

const Paso = () => {
    let {pa} = useParams();
    
    console.log(pa);
    return (
        <div>
            <h3>{`En este paso se revisa el tema: ${initial[pa]}`} </h3>
        </div>
    )
}

export default Paso
