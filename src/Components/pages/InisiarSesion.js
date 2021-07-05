import { Form, FormControl, Button } from "react-bootstrap";
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Registro from "./Registro";
const InisiarSesion = () => {

  let {path, url} = useRouteMatch();
  console.log(path, url);
  return (
   
    <>
       <h3>Eres Nuevo?</h3> 
       <p>Para continuar comprando crea una cuenta</p>
       <Button>Crear Una nueva Cuenta</Button>
       <Link to={`${url}/Registro`}>Crear nueva Cuenta</Link>
       
      <Form>
        <h3>Inisiar Sesisón</h3>
        <p>Ingresa tu correo electrónico y la contraseña para que puedas comprar</p>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
       
        <Button variant="primary" type="submit">
          Submit
        </Button>
        

      </Form>
      <Switch>
      
          <Route path={`${path}/Registro`} component={Registro}></Route>
       </Switch>
    </>
  );
};

export default InisiarSesion;
