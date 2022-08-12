import { useState, useEffect } from 'react';
import { UserContext } from './contexts/UserContext';
import { Routes, Route } from 'react-router-dom';

import { getCurrentUser } from './services/userService';

import { Home } from './components/common/home';
import { Navbar } from './components/common/navbar';
import { Register } from './components/users/register';
import { Login } from './components/users/login';
import { UserRecipes } from './components/userRecipes/userRecipes';
import { RecipeForm } from './components/userRecipes/recipeForm/recipeForm';
import { Logout } from './components/users/logout';
import { Recipes } from './components/recipes/recipes';
import { Recipe } from './components/recipes/recipe/recipe';
import { NotFound } from './components/common/notFound';

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
            <Route path='/logout' element={<Logout />} />
            <Route path='/:user' element={<UserRecipes />} />
            <Route path='/:user/:recipeId' element={<RecipeForm />} />
            <Route path='/recipes' element={<Recipes />} />
            <Route path='/recipes/:recipeId' element={<Recipe />} />
            <Route path='/notFound' element={<NotFound />} />
          </Routes>
        </main>
      </UserContext.Provider>
    </>
  );
}

export default App;
