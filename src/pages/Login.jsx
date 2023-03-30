import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    axios
      .post("https://e-comerce-api.onrender.com/api/v1/users/login", data)
      .then((res) => {
        navigate("/");
        localStorage.setItem("token", res.data.token);
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          alert("credenciales Incorrectas");
        } else {
          console.log(error.response?.data);
        }
      });
  };

  return (
    <Form
      onSubmit={handleSubmit(submit)}
      style={{ maxWidth: 600, margin: "0 auto", padding: "30px 0" }}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <h1>Login</h1>
        <div>
          <h3>Para probar:</h3>
          <p>User: admin@gmail.com</p>
          <p>Pass: admin1234</p>
        </div>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          {...register("email")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...register("password")}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Login;