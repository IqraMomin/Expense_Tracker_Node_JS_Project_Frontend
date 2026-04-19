import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './pages/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import Welcome from './pages/Welcome';
import { useEffect } from 'react';
import { fetchAllExpenses } from './store/Slices/expenseSlice';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
      <div className='container-fluid'>
    <Switch>   
    
      <Route path="/" exact>
      {!isLoggedIn && <SignUp/>}
      {isLoggedIn && <Welcome/>}
      </Route>
      <Route path="/welcome">
      {!isLoggedIn && <SignUp/>}
      {isLoggedIn && <Welcome/>}
      </Route>         
    </Switch>
    </div>
    </Router>
  )
}

export default App
