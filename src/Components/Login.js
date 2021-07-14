import { Container, Row, Col } from "react-bootstrap";
import {useState} from 'react'

import "./Login.scss"
import "bootstrap/dist/css/bootstrap.min.css";

import Registro from "./pages/Registro";
import InisiarSesion from "./pages/InisiarSesion";


const Login = () => {
  
  return (
    <>
      <Container fluid className="Container">
        <Row className="row">
          <Col className="ColumnaUno"  xl={5}>
            <img  src="https://bizroulette.app/static/media/undraw_unlock_24mb.9b0de180.svg" alt=""></img>
          </Col>
          <Col className="ComumnaDos" md={12} xl={7}>
            {/* <div className="Enlaces">
               <a className="Enlace" onClick={handleSesion}>Iniciar Sesión</a>
               <a  className="Enlace" onClick={handleCuenta}>Crear una cuenta</a>
            </div> */}
           

            {true? <InisiarSesion></InisiarSesion>:<Registro></Registro>}

          </Col>
        </Row>
      </Container>
     
    </>
  );
};

export default Login;
