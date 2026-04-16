import React, { useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import "./SignUp.css";

function SignUp() {
    const [login,setLogin] = useState(false);

    return (
        <div className='signup-div'>
            <div className="mb-4">
            <h2>{login ? "Login" : "SignUp"}</h2>
            </div>           
            <Form>
            <FloatingLabel
        controlId="name"
        label="Name"
        className="mb-3">
        <Form.Control type="email" placeholder="name" />
      </FloatingLabel>
            <FloatingLabel
        controlId="email"
        label="Email address"
        className="mb-3">
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel controlId="password" label="Password" className="mb-3">
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>
     {!login && <FloatingLabel controlId="confirmPassword" label="Confirm Password" className="mb-3">
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>} 
      <div className='text-center d-flex flex-column gap-2'>
      <Button type="submit" variant="primary">{login ? "LOGIN" : "SIGNUP"}</Button>
      <Button style={{color:"black"}} variant="link">Already a user? Login</Button>
      </div>
            </Form>

            
        </div>
    )
}

export default SignUp
