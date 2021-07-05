import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {useState} from 'react'
import {Link} from 'react-router-dom'
//import "./Login.css"
import "./Login.scss"
import "bootstrap/dist/css/bootstrap.min.css";
import Admin from "./Admin";

const initialForm = {
  email: "",
  pass: ""
}

const Login = () => {
  const [form, setForm] = useState(initialForm);



  let col1 = {
    display: "flex"
  }

  let im = {
      width: "80%",
     


  }


  let col2 = {
    padding: "40px 60px",
  }

  let button = {

  }


 const handleChange = (e) =>{
    setForm({...form,
            [e.target.name]: e.target.value})
 }

 const handleSubmit = (e) =>{
   e.preventDefault();
   if(form.email === "uno@dos" && form.pass === "uno"){
     console.log("entro");
     window.location.href="./Admin"
   } else {
     window.location.href="./User"
   }
 }


  return (
    <>
      <Container fluid className="Container">
        <Row className="row">
          <Col className="ColumnaUno"  xl={5}>
            <img style={im} src="../../images/team.svg" alt=""></img>
          </Col>
          <Col style={col2}  md={12} xl={7}>
            <div className="Enlaces">
               <Link className="Enlace" to>Iniciar Sesión</Link>
               <Link className="Enlace" to>Crear una Cuenta</Link> 
            </div>
            <Form>
              <h2>Bienvenido a ISOTools</h2>
              <p>Registra tu cuenta</p>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="pass" value={form.pass} onChange={handleChange} placeholder="Password" />
              </Form.Group>
           
              <Button className="prueba" variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
