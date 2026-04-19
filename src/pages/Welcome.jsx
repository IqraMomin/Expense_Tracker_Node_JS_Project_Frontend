import React from 'react'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import { Button } from 'react-bootstrap'
import Checkout from '../components/CheckOut'

function Welcome() {
    return (
        <div>
            <Checkout/>
            <ExpenseForm/>
            <ExpenseList/>
            
        </div>
    )
}

export default Welcome
