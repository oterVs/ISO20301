import React, {useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

const initialForm = {
  usuario: "",
  pass: "",
};

const cookies = new Cookies();

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const InisiarSesion = () => {
  const [form, setForm] = useState(initialForm);
  const [open, setOpen] = React.useState(false);

  let history = useHistory();
  
  useEffect(() => {
    cookies.remove("usuario", { path: "/" });
    cookies.remove("tipo", { path: "/" });

  }, [])


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     await axios
      .get(
        `https://sgcn-app.herokuapp.com/seguridad/iniciarSession/${form.usuario}/${form.pass}`
      )
      .then((response) => {
    
        return response.data;

      })
      .then((response) => {
        
        if (response) {
          console.log(response)
          let respuesta = response[0];
          console.log(respuesta);
          cookies.set("usuario", response.nombreUsuario, { path: "/" });
          cookies.set("tipo", response.rol.idRol, { path: "/" });
          console.log(cookies.get("tipo"));

          if (cookies.get("tipo") === "1") {
            history.push("/Admin");
          } else if(cookies.get("tipo") === "3") {
          
            history.push("/AdminParticipantes");
           
          } else {
            history.push("/User");
          }
        } else {
         
          setOpen(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setOpen(true);
      });

  };
  return (
    <>
      <Form>
        <h2>Sistema de Gestión de la Continuidad del Negocio</h2>
        <hr style={{marginBottom:"30px"}}></hr>
        <Form.Group controlId="formBasicEmail" >
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="txt"
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            placeholder="Ingrese su Usuario"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="pass"
            value={form.pass}
            onChange={handleChange}
            placeholder="Intrese su Contraseña"
          />
        </Form.Group>

        <Button className="prueba" variant="primary" onClick={handleSubmit} style={{marginTop:"20px"}}>
          Iniciar Sesión
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Usuario incorrecto!
          </Alert>
        </Snackbar>
      </Form>
    </>
  );
};

export default InisiarSesion;
