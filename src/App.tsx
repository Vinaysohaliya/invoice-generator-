
import './App.css'

import { Route, Routes } from 'react-router-dom';
import Products from './Components/Products';
import LoginPage from './Components/Login';
import RegistrationPage from './Components/Signup';
import Home from './Components/Home';

function App() {

  return (
    <>
     <Routes>

     <Route path="/add" element={<Products/>}></Route>
     <Route path="/signin" element={<LoginPage/>}></Route>
     <Route path="/signup" element={<RegistrationPage/>}></Route>
     <Route path="/" element={<Home/>}></Route>
     </Routes>
    </>
  )
}

export default App
