import React from 'react'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import Checkout from '../components/CheckOut'
import NavigationBar from '../components/Header/NavigationBar'
import DailyExpense from './DailyExpense'
import WeeklyExpenses from './WeeklyExpenses'
import MonthlyExpense from './MonthlyExpense'

function Welcome() {

    return (
        <>
        <NavigationBar/>            
            <Checkout/>
            <ExpenseForm/>
            <DailyExpense/>
            <WeeklyExpenses/>
            <MonthlyExpense/>
            <ExpenseList/>
            
            
            
        </>
    )
}

export default Welcome
