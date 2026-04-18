import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './pages/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import Welcome from './pages/Welcome';
import { useEffect } from 'react';
import { fetchAllExpenses } from './store/Slices/expenseSlice';

function App() {
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  const dispatch =  useDispatch();

  useEffect(()=>{
    if(isLoggedIn){
      dispatch(fetchAllExpenses());
    }
    
  },[])
  
  return (
    <div className='container-fluid'>
      {!isLoggedIn && <SignUp/>}
      {isLoggedIn && <Welcome/>}
      
    </div>
  )
}

export default App
