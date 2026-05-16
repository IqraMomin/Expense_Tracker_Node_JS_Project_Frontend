import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import SignUp from './pages/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import Welcome from './pages/Welcome';
import { useEffect } from 'react';
import { fetchAllExpenses } from './store/Slices/expenseSlice';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ForgotPassword from './components/ForgotPassword';
import { Container } from 'react-bootstrap';

function App() {
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  const dispatch =  useDispatch();

  useEffect(()=>{
    if(isLoggedIn){
      const saved = Number(localStorage.getItem("itemsPerPage"));
      const currentPage = Number(localStorage.getItem("currentPage"));
      dispatch(fetchAllExpenses({page:currentPage,limit:saved}));
    }
    
  },[isLoggedIn]);
  
  return (
    <Container fluid>
    <Router>
    <Switch>   
    
      <Route path="/" exact>
      {!isLoggedIn && <SignUp/>}
      {isLoggedIn && <Welcome/>}
      </Route>
      <Route path="/welcome">
      {!isLoggedIn && <SignUp/>}
      {isLoggedIn && <Welcome/>}
      </Route>   
      <Route path="/forgot-password">
        <ForgotPassword/>
        </Route>      
    </Switch>
    </Router>
    </Container>
  )
}

export default App
