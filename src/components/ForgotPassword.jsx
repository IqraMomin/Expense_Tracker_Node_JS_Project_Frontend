import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
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
        <Form onSubmit={formSubmitHandler}>
            <h2>Reset Password</h2>
            <Form.Label htmlFor="emailInput">Email</Form.Label>
            <Form.Control
                type="email"
                id="emailInput"
                aria-describedby="emailHelpBlock"
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value);
                }}
                placeholder='Please enter your registered email id...'
            />
            <Button type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default ForgotPassword
