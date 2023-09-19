import Login from './components/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './components/Admin/adminPage';
import StudentPage from './components/Student/StudentPage';
import SignUp from './components/SignUp/SignUp';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' Component={Login}></Route>
    <Route path='/signup' Component={SignUp}></Route>
    <Route path='/admin' Component={AdminPage}></Route>
    <Route path='/student' Component={StudentPage}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
