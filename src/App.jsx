import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './pages/SignUp';
import { useSelector } from 'react-redux';
import Welcome from './pages/Welcome';

function App() {
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  
  return (
    <div className='container-fluid'>
      {!isLoggedIn && <SignUp/>}
      {isLoggedIn && <Welcome/>}
      
    </div>
  )
}

export default App
