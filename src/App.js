import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Home } from './components/public/common/home';
import { Navbar } from './components/public/common/navbar';
import { Register } from './components/public/users/register';
import { Login } from './components/public/users/login';
import { Logout } from './components/public/users/logout';
import { Recipes } from './components/public/recipes/recipes';
import { Recipe } from './components/public/recipes/recipe';
//import './App.css';

function App() {

  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem('token');
      const user = jwtDecode(jwt);
      setUser(user);
    } catch (ex) {}
  }, [])

  return (
    <>
      <main className='container'>
        <Navbar user={user}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/recipes/:recipeId' element={<Recipe />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
