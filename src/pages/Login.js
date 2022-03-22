import React, { useState } from 'react';
import './Login.css';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../services/appApi';

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginUser, { isloading, isError, error }] = useLoginUserMutation();

    function handleLogin(e){
        e.preventDefault();
        loginUser({email, password})
        .then(({ error }) => {
            if (!error) {
                navigate('/');
            }
        })
    }

    return (
        <Container>
            <Row>
                <Col md={7} className="d-flex align-items-center justify-center-center">
                    <Form className="login__form mx-4" onSubmit={handleLogin}>
                        <h1 className="mb-4 text-center">Login</h1>
                        {isError && <p className="alert alert-danger text-center">{error.data}</p>}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isloading} >
                            Login
                        </Button>
                        <div className="py-4 text-center">
                            <p>
                                Don't have an account? <Link to='/signup'>Register Here</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
                <Col md={5} className="login__bg"></Col>
            </Row>
        </Container>
    )
}

export default Login