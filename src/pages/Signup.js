import React, { useState } from 'react';
import './Signup.css';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupUserMutation } from '../services/appApi';

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [signupUser, { isLoading, isError, error }] = useSignupUserMutation();

    function handleSignup(e) {
        e.preventDefault();
        signupUser({ name, email, password })
            .then(({ error }) => {
                if (!error) {
                    alert("User is registered");
                }
            })
            navigate('/login');
    }

    return (
        <Container>
            <Row>
                <Col md={7} className="d-flex align-items-center justify-center-center">
                    <Form className="signup__form mx-4" onSubmit={handleSignup}>
                        <h1 className="mb-4 text-center">Register account</h1>
                        {isError && <p className="alert alert-danger text-center">{error.data}</p>}
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isLoading}>
                            Register
                        </Button>
                        <div className="py-4 text-center">
                            <p>
                                Already have an account? <Link to='/login'>Login Here</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
                <Col md={5} className="signup__bg"></Col>
            </Row>
        </Container>
    )
}

export default Signup