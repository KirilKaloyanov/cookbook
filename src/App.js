import { Routes, Route } from 'react-router-dom';
import { Register } from './components/public/users/register';
import { Login } from './components/public/users/login';
import { Recipes } from './components/public/recipes/recipes';
import { Recipe } from './components/public/recipes/recipe';
//import './App.css';

function App() {

  return (
    <>
      <main className='container'>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/recipes/:recipeId' element={<Recipe />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
