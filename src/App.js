import { useState, useEffect } from 'react';
import { UserContext } from './components/contexts/UserContext';
import { Routes, Route } from 'react-router-dom';

import { getCurrentUser } from './services/userService';

import { Home } from './components/public/common/home';
import { Navbar } from './components/public/common/navbar';
import { Register } from './components/public/users/register';
import { Login } from './components/public/users/login';
import { UserRecipes } from './components/private/userRecipes';
import { RecipeForm } from './components/private/recipeForm';
import { Logout } from './components/public/users/logout';
import { Recipes } from './components/public/recipes/recipes';
import { Recipe } from './components/public/recipes/recipe';
//import './App.css';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) setUser(user.currentUser);
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
            <Route path='/:userRecipes/:recipeId' element={<RecipeForm />} />
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
