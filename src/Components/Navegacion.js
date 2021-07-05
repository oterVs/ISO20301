import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import {Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
const Navegacion = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#">ISO 22301</Navbar.Brand>
        
        <Nav className="mr-auto">
          
          <Link className="nav-link" to="/InisiarSesion">Inisiar Sesion</Link>
          <Link className="nav-link" to="/Registro">Registro</Link>
          <Link className="nav-link" to="/Docs">Documentación</Link>
          
        </Nav>
       
      </Navbar>
     
      

      

    </>
  );
};

export default Navegacion;
