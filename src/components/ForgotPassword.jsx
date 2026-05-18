import React, { useState } from 'react';
import { Button, Form, Card, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../store/Slices/authSlice';

function ForgotPassword() {
    const [email,setEmail] = useState("");
    const dispatch = useDispatch();

    const formSubmitHandler = (e)=>{
        e.preventDefault();
        dispatch(resetPassword({email}));
        setEmail("");
    }
    return (
        
        <Container
            fluid
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f7fb"
            }}
        >

            <Card
                style={{
                    width: "400px",
                    padding: "30px",
                    borderRadius: "15px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}
            >

                <h2
                    className="text-center mb-4"
                    style={{
                        fontWeight: "bold",
                        color: "#1e293b"
                    }}
                >
                    Reset Password
                </h2>

                <Form onSubmit={formSubmitHandler}>

                    <Form.Group className="mb-3">

                        <Form.Label
                            htmlFor="emailInput"
                            style={{ fontWeight: "500" }}
                        >
                            Email Address
                        </Form.Label>

                        <Form.Control
                            type="email"
                            id="emailInput"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            placeholder="Enter your registered email"
                            style={{
                                padding: "12px",
                                borderRadius: "10px"
                            }}
                        />

                    </Form.Group>

                    <Button
                        type="submit"
                        className="w-100"
                        style={{
                            padding: "10px",
                            borderRadius: "10px",
                            fontWeight: "600"
                        }}
                    >
                        Send Reset Link
                    </Button>

                </Form>

            </Card>

        </Container>
    )
}

export default ForgotPassword
