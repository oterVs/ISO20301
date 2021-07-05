
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navegacion from './Components/Navegacion';

import 'bootstrap/dist/css/bootstrap.min.css';
import InisiarSesion from './Components/pages/InisiarSesion';
import Registro from './Components/pages/Registro';
import Documentacion from './Components/pages/Documentacion';

import Login from './Components/Login'
import Admin from './Components/Admin';
import Question from './Components/pages/Question';

function App() {
  return (
    <div >
       <Router>
       
       
         <Switch>
      
           <Route exact path="/" component={Login}></Route>
           <Route path="/Admin" component={Admin}></Route>
           
           <Route path="/Docs" component={Documentacion}></Route>
         </Switch>
       </Router>
    </div>
  );
}

export default App;
