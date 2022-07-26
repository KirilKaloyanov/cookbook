import { Routes, Route } from 'react-router-dom';
import { Register } from './components/public/register';
import { Login } from './components/public/login';
import { Recipes } from './components/public/recipes';
import { Recipe } from './components/public/recipe';
import './App.css';

function App() {

  return (
    <>
      <Routes>
        <Route path='/register' element = {<Register />}/>
        <Route path='/login' element = {<Login />}/>
        <Route path='/recipes' element = {<Recipes />}/>
        <Route path='/recipes/:recipeId' element = {<Recipe />}/>
      </Routes>
    </>
  );
}

export default App;
