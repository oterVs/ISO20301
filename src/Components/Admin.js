import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import Question from "./pages/Question";

const Admin = () => {

  let {path, url} = useRouteMatch();

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#">ISO 22301</Navbar.Brand>

        <Nav className="mr-auto">
          <Link className="nav-link" to={`${url}/Question`}>
            Ingresar una nueva pregunta
          </Link>
          <Link className="nav-link" to="/Registro">
            Grafico
          </Link>
          <Link className="nav-link" to="/Docs">
            Documentación
          </Link>
        </Nav>
      </Navbar>

      <Switch>

        <Route path={`${path}/Question`} component={Question}></Route>
      </Switch>
    </>
  );
};

export default Admin;
