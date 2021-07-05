import React from 'react'
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';
import Paso from './Paso';

const Documentacion = () => {
    let {path, url} = useRouteMatch();
    return (
        <div>
           <h2>Guía practica plan de continuidad del negocio</h2> 
           <Link to={`${url}/Paso/uno`}>Paso 1</Link>
           <Link to={`${url}/Paso/dos`}>Paso 2</Link>
           <Link to={`${url}/Paso/tres`}>Paso 3</Link>


           <Switch>
              
      
                <Route path={`${path}/Paso/:pa`} component={Paso}></Route>
                <Route path={`${path}/Paso/:pa`} component={Paso}></Route>
                <Route path={`${path}/Paso/:pa`} component={Paso}></Route>
            </Switch>
        </div>
    )
}

export default Documentacion
