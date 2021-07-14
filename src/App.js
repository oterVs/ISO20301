import "./App.css";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Switch,
} from "react-router-dom";
import Navegacion from "./Components/Navegacion";

import "bootstrap/dist/css/bootstrap.min.css";
import InisiarSesion from "./Components/pages/InisiarSesion";
import Registro from "./Components/pages/Registro";
import Documentacion from "./Components/pages/Documentacion";

import Login from "./Components/Login";
import Admin from "./Components/Admin";
import User from "./Components/User";
import AdminParticipantes from "./Components/AdminParticipantes";

function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/Admin" component={Admin}></Route>
          <Route
            path="/AdminParticipantes"
            component={AdminParticipantes}
          ></Route>
          <Route path="/User" component={User}></Route>

          <Route path="/Docs" component={Documentacion}></Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
