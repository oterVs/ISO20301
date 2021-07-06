import { useRouteMatch } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const initialForm = {
  email: "",
  pass: "",
};

const InisiarSesion = () => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email === "uno@dos" && form.pass === "uno") {
      console.log("entro");
      window.location.href = "./Admin";
    } else {
      window.location.href = "./User";
    }
  };
  return (
    <>
      <Form>
        <h2>Bienvenido a ISOTools</h2>
        <hr></hr>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="pass"
            value={form.pass}
            onChange={handleChange}
            placeholder="Password"
          />
        </Form.Group>

        <Button className="prueba" variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default InisiarSesion;
