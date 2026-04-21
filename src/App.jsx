import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './pages/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import Welcome from './pages/Welcome';
import { useEffect } from 'react';
import { fetchAllExpenses } from './store/Slices/expenseSlice';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from 'react-bootstrap';
import ForgotPassword from './components/ForgotPassword';

function App() {
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  const dispatch =  useDispatch();

  useEffect(()=>{
    if(isLoggedIn){
      dispatch(fetchAllExpenses());
    }
    
  },[isLoggedIn]);
  
  return (
    <Router>
      <Container fluid className='g-0'>
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
    </Container>
    </Router>
  )
}

export default App
