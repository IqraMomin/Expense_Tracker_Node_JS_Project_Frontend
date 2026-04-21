import React from 'react'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import Checkout from '../components/CheckOut'
import NavigationBar from '../components/Header/NavigationBar'

function Welcome() {

    return (
        <>
        <NavigationBar/>
            
            <Checkout/>
            <ExpenseForm/>
            <ExpenseList/>
            
            
        </>
    )
}

export default Welcome
