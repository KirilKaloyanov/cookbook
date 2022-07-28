import { useState, useEffect } from 'react';
import { UserContext } from './components/contexts/UserContext';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/public/common/home';
import { Navbar } from './components/public/common/navbar';
import { Register } from './components/public/users/register';
import { Login } from './components/public/users/login';
import { UserRecipes } from './components/private/userRecipes';
import { Logout } from './components/public/users/logout';
import { Recipes } from './components/public/recipes/recipes';
import { Recipe } from './components/public/recipes/recipe';
import { getCurrentUser } from './services/userService';
//import './App.css';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, [])

  return (
    <>
      <UserContext.Provider value={user}>
        <main className='container'>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/:userRecipes' element={<UserRecipes />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/recipes' element={<Recipes />} />
            <Route path='/recipes/:recipeId' element={<Recipe />} />
          </Routes>
        </main>
      </UserContext.Provider>
    </>
  );
}

export default App;
