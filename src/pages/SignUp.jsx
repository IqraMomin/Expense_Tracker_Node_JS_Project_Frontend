import React, { useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import "./SignUp.css";
import { useDispatch } from 'react-redux';
import { loginUser, signUp } from '../store/Slices/authSlice';

const initialFormData = {
    name: "", email: "", password: "", confirmPassword: ""
}

function SignUp() {
    const [login, setLogin] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({ name: "", password: "", email: "", confirmPassword: "" });
    const dispatch = useDispatch();

    const checkForm = (name, email, password, password2,isLogin) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let newErrors = {};

        // Name
        
        // Email
        if (email.trim().length === 0) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Invalid email format";
        }

        // Password
        if (password.trim().length === 0) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if(!isLogin){
            //Name
        if (name.trim().length === 0) {
            newErrors.name = "Name is required";
        }


        // Confirm Password
        if (password2.trim().length === 0) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (password !== password2) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        }
        

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;


    }
    const formSubmitHandler = (e) => {
        e.preventDefault();
        const { name, password, email, confirmPassword } = formData;
        const isValid = checkForm(name, email, password, confirmPassword,login);
        if (!login && isValid) {
            const data = {
                name,
                password, email
            }
            dispatch(signUp(data));  
            resetForm();          
        }else if(login && isValid){
            console.log("Inside login")
            dispatch(loginUser({email,password}));
            resetForm();
        }
        

    }
    const resetForm = () => {
        setFormData(initialFormData);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => (
            { ...prev, [name]: value }))
        setErrors(prev => (
            { ...prev, [name]: "" }
        ))
    }

    return (
        <div className='signup-div'>
            <div className="mb-4">
                <h2>{login ? "Welcome back" : "Get Started"}</h2>
                <p style={{marginTop:"1rem"}}>{login ? "Please enter your details" : "Create Account"}</p>
            </div>
            <Form onSubmit={formSubmitHandler}>
                {!login && <FloatingLabel
                    controlId="name"
                    label="Name"
                    className="mb-3">
                    <Form.Control value={formData.name} name='name' onChange={handleChange} type="text"
                        placeholder="name"
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                    
                </FloatingLabel>}
                
                <FloatingLabel
                    controlId="email"
                    label="Email address"
                    className="mb-3">
                    <Form.Control value={formData.email}
                        isInvalid={!!errors.email}
                        
                        onChange={handleChange} type="email" name='email' placeholder="name@example.com" />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>

                </FloatingLabel>
                <FloatingLabel controlId="password" label="Password" className="mb-3">
                    <Form.Control value={formData.password} onChange={handleChange}
                        type="password" name="password" placeholder="Password"
                        isInvalid={!!errors.password} />
                   <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                    
                </FloatingLabel>
                {!login && <FloatingLabel controlId="confirmPassword" label="Confirm Password" className="mb-3">
                    <Form.Control value={formData.confirmPassword} 
                    isInvalid={!!errors.confirmPassword}
                    onChange={handleChange} type="password" name='confirmPassword' placeholder="Password" />
                   
                    <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                    </Form.Control.Feedback></FloatingLabel>}
                <div className='d-flex flex-column gap-2'>
                    <Button type="submit" variant="primary">{login ? "LOGIN" : "SIGNUP"}</Button>
                    <Button onClick={()=>{setLogin(!login)}} style={{ color: "black" }} variant="link">
                       {login ? "New User? Sign Up":"Already a user? Login"} 
                        </Button>
                </div>
            </Form>


        </div>
    )
}

export default SignUp
