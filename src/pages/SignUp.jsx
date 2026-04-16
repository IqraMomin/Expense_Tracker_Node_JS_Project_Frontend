import React, { useState } from 'react'
import { Form } from 'react-bootstrap';

function SignUp() {
    const [login,setLogin] = useState(false);

    return (
        <div className='signup-div'>
            <h2>{login ? "Login" : "SignUp"}</h2>
            <Form>
                
            </Form>

            
        </div>
    )
}

export default SignUp
